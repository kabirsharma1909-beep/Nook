// Scoring for the screening assessment.
//
// This produces a *reading profile* made of per-domain scores and
// qualitative bands. It intentionally does not produce a diagnosis, a
// dyslexia probability, or a severity rating — screening tools like this
// are meant to flag domains worth a closer look, not to replace a
// qualified evaluator.
//
// SCORING THRESHOLDS live in `BAND_THRESHOLDS` below. Adjust them here if
// the rubric changes; nothing else needs to change.

import { DOMAINS } from '../data/questions';

export const BAND_THRESHOLDS = {
  strength: 75, // domain score >= this -> "strength"
  developing: 50 // domain score >= this (and < strength) -> "developing"; below -> "needs attention"
};

export function bandForScore(score) {
  if (score >= BAND_THRESHOLDS.strength) return 'strength';
  if (score >= BAND_THRESHOLDS.developing) return 'developing';
  return 'attention';
}

export const BAND_LABELS = {
  strength: 'Strength',
  developing: 'Developing',
  attention: 'Needs attention'
};

// responses: [{ questionId, domain, correct, responseTimeMs }]
export function scoreAssessment(responses) {
  const byDomain = {};
  responses.forEach((r) => {
    if (!byDomain[r.domain]) byDomain[r.domain] = { correct: 0, total: 0, totalTimeMs: 0 };
    byDomain[r.domain].total += 1;
    byDomain[r.domain].totalTimeMs += r.responseTimeMs || 0;
    if (r.correct) byDomain[r.domain].correct += 1;
  });

  const domainScores = Object.entries(byDomain).map(([domain, stats]) => {
    const accuracy = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
    const avgTimeMs = stats.total > 0 ? stats.totalTimeMs / stats.total : 0;
    const score = Math.round(accuracy);
    return {
      domain,
      label: DOMAINS[domain]?.label || domain,
      score,
      band: bandForScore(score),
      correct: stats.correct,
      total: stats.total,
      avgResponseMs: Math.round(avgTimeMs)
    };
  });

  const attentionCount = domainScores.filter((d) => d.band === 'attention').length;
  let overallSignal = 'typical';
  if (attentionCount >= 2) overallSignal = 'consider-evaluation';
  else if (attentionCount === 1) overallSignal = 'watch';

  const overallScore = domainScores.length
    ? Math.round(domainScores.reduce((sum, d) => sum + d.score, 0) / domainScores.length)
    : 0;

  return {
    domainScores,
    overallScore,
    overallSignal,
    completedAt: Date.now()
  };
}

export const SIGNAL_COPY = {
  typical: {
    heading: 'Within the typical range for this sample',
    body: 'Every domain in this short screening fell in the developing-to-strength range. That is a good sign, not a clearance — keep an eye on reading over time.'
  },
  watch: {
    heading: 'One area worth watching',
    body: 'One domain came back lower than the others. It may just be an off day, or it may be worth some focused practice and a follow-up screening in a few weeks.'
  },
  'consider-evaluation': {
    heading: 'Consider a professional evaluation',
    body: 'More than one domain came back low in this screening. That does not mean a diagnosis — only a qualified professional can determine that — but it is a reasonable point to loop in a reading specialist, school psychologist, or pediatrician.'
  }
};

export function recommendedDomains(domainScores) {
  return domainScores
    .filter((d) => d.band !== 'strength')
    .sort((a, b) => a.score - b.score)
    .map((d) => d.domain);
}
