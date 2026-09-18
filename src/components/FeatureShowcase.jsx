import { useState } from 'react';
import './FeatureShowcase.css';

function AdaptiveDemo() {
  const [level, setLevel] = useState(2);
  const levels = ['Warm-up', 'Building', 'Stretch'];
  return (
    <div className="feat-visual feat-adaptive">
      <div className="feat-adaptive__ladder">
        {levels.map((l, i) => (
          <button
            key={l}
            type="button"
            className={`feat-adaptive__rung ${level === i ? 'is-active' : ''}`}
            onClick={() => setLevel(i)}
          >
            <span className="feat-adaptive__rung-index">{i + 1}</span>
            {l}
          </button>
        ))}
      </div>
      <p className="text-small">
        {level === 0 && 'A missed answer steps difficulty back down here.'}
        {level === 1 && 'Most items sit at this level for a typical session.'}
        {level === 2 && 'Two correct answers in a row moved difficulty up.'}
      </p>
    </div>
  );
}

function ReadingAnalysisDemo() {
  const passage = ['The', 'quick', 'brown', 'fox', 'crossed', 'the', 'quiet', 'field'];
  const slow = new Set(['crossed', 'quiet']);
  return (
    <div className="feat-visual feat-reading">
      <p className="feat-reading__passage">
        {passage.map((w) => (
          <span key={w} className={slow.has(w) ? 'is-flagged' : ''}>
            {w}{' '}
          </span>
        ))}
      </p>
      <div className="feat-reading__metrics">
        <div>
          <span className="feat-reading__metric-value">96 wpm</span>
          <span className="text-small">Reading rate</span>
        </div>
        <div>
          <span className="feat-reading__metric-value">2 words</span>
          <span className="text-small">Flagged for slower decoding</span>
        </div>
      </div>
    </div>
  );
}

function ExerciseMapDemo() {
  return (
    <div className="feat-visual feat-exercise-map">
      <div className="feat-exercise-map__node">
        <span className="text-small">Domain score</span>
        <strong>Phonological awareness &mdash; 44</strong>
      </div>
      <div className="feat-exercise-map__arrow" aria-hidden="true">
        &darr;
      </div>
      <div className="feat-exercise-map__node feat-exercise-map__node--accent">
        <span className="text-small">Assigned today</span>
        <strong>Rhyme sort &middot; 5 min</strong>
      </div>
    </div>
  );
}

function ProgressSparkline() {
  const points = [22, 30, 28, 41, 47, 52, 61];
  const w = 240;
  const h = 90;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p - min) / (max - min || 1)) * (h - 16) - 8;
    return [x, y];
  });
  const path = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  return (
    <div className="feat-visual feat-progress">
      <svg viewBox={`0 0 ${w} ${h}`} className="feat-progress__svg" role="img" aria-label="Reading score trending upward over six sessions">
        <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {coords.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === coords.length - 1 ? 4 : 2.5} fill="var(--accent)" />
        ))}
      </svg>
      <p className="text-small">Composite score across six sessions, three weeks apart.</p>
    </div>
  );
}

function ErrorPatternDemo() {
  const patterns = [
    { label: 'Letter reversal', example: 'b \u2194 d' },
    { label: 'Word transposition', example: 'was \u2194 saw' },
    { label: 'Sound omission', example: 'stop \u2192 sop' }
  ];
  return (
    <div className="feat-visual feat-errors">
      {patterns.map((p) => (
        <div key={p.label} className="feat-errors__row">
          <span className="text-small">{p.label}</span>
          <span className="feat-errors__example">{p.example}</span>
        </div>
      ))}
    </div>
  );
}

function ReportPreviewDemo() {
  return (
    <div className="feat-visual feat-report">
      <div className="feat-report__head">
        <span className="text-small">Screening summary</span>
        <span className="text-small">Sept 2026</span>
      </div>
      <div className="feat-report__line" style={{ width: '92%' }} />
      <div className="feat-report__line" style={{ width: '78%' }} />
      <div className="feat-report__line" style={{ width: '85%' }} />
      <div className="feat-report__chip">Share with a reading specialist</div>
    </div>
  );
}

const FEATURES = [
  {
    id: 'adaptive',
    title: 'Adaptive screening',
    body: 'Each response shifts the difficulty of what comes next, the same way an experienced interventionist would adjust on the fly.',
    Visual: AdaptiveDemo
  },
  {
    id: 'analysis',
    title: 'Reading analysis',
    body: 'Passages are timed and scored word by word, so slower or effortful decoding is visible instead of averaged away.',
    Visual: ReadingAnalysisDemo
  },
  {
    id: 'exercises',
    title: 'Personalized exercises',
    body: 'Weak domains route directly into short, targeted practice rather than a generic worksheet packet.',
    Visual: ExerciseMapDemo
  },
  {
    id: 'progress',
    title: 'Progress tracking',
    body: 'Scores are tracked across sessions so a family can see a trend line, not just a single snapshot.',
    Visual: ProgressSparkline
  },
  {
    id: 'errors',
    title: 'Error patterns',
    body: 'Instead of a raw score, the profile names the kind of error that shows up most, since that is what practice should target.',
    Visual: ErrorPatternDemo
  },
  {
    id: 'reporting',
    title: 'Parent and professional reporting',
    body: 'A clean, exportable summary that a teacher, tutor, or clinician can act on without decoding raw data.',
    Visual: ReportPreviewDemo
  }
];

export default function FeatureShowcase() {
  return (
    <div className="feature-showcase">
      {FEATURES.map((f, i) => (
        <div className={`feature-row ${i % 2 === 1 ? 'is-reversed' : ''}`} key={f.id}>
          <div className="feature-row__text">
            <h3 className="text-h3">{f.title}</h3>
            <p className="text-body">{f.body}</p>
          </div>
          <div className="feature-row__visual">
            <f.Visual />
          </div>
        </div>
      ))}
    </div>
  );
}
