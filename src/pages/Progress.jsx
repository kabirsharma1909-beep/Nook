import { AppNav } from '../components/Nav.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import ProgressChart from '../components/ProgressChart.jsx';
import { DOMAINS } from '../data/questions.js';
import './Progress.css';

function DomainTrend({ domain, points }) {
  const w = 280;
  const h = 70;
  const pad = 10;
  if (points.length === 0) return null;
  const max = 100;
  const min = 0;
  const coords = points.map((p, i) => {
    const x = points.length === 1 ? w / 2 : pad + (i / (points.length - 1)) * (w - pad * 2);
    const y = h - pad - ((p - min) / (max - min)) * (h - pad * 2);
    return [x, y];
  });
  const path = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const latest = points[points.length - 1];

  return (
    <div className="domain-trend">
      <div className="domain-trend__head">
        <span className="text-body" style={{ color: 'var(--ink)' }}>
          {DOMAINS[domain]?.label}
        </span>
        <span className="serif">{latest}</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`${DOMAINS[domain]?.label} score across sessions`}>
        <path d={path} fill="none" stroke="var(--accent-2)" strokeWidth="2" strokeLinecap="round" />
        {coords.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === coords.length - 1 ? 3.5 : 2} fill="var(--accent-2)" />
        ))}
      </svg>
    </div>
  );
}

export default function Progress() {
  const { activeChild, assessmentsForChild, exerciseLogsForChild } = useAuth();
  const assessments = assessmentsForChild(activeChild.id);
  const logs = exerciseLogsForChild(activeChild.id);

  const domainSeries = {};
  assessments.forEach((a) => {
    a.domainScores.forEach((d) => {
      if (!domainSeries[d.domain]) domainSeries[d.domain] = [];
      domainSeries[d.domain].push(d.score);
    });
  });

  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const thisWeek = logs.filter((l) => l.createdAt >= weekAgo).length;

  return (
    <div className="progress-page">
      <AppNav />
      <div className="container progress-page__inner">
        <h1 className="text-h1" style={{ marginBottom: 10 }}>
          Progress
        </h1>
        <p className="text-body" style={{ marginBottom: 44 }}>
          {activeChild.name}'s trend across {assessments.length} screening{assessments.length === 1 ? '' : 's'} and{' '}
          {logs.length} completed exercise{logs.length === 1 ? '' : 's'}.
        </p>

        <div className="progress-page__stats">
          <div className="panel">
            <span className="text-small">Exercises completed</span>
            <p className="text-h2" style={{ marginTop: 8 }}>
              {logs.length}
            </p>
          </div>
          <div className="panel">
            <span className="text-small">Completed this week</span>
            <p className="text-h2" style={{ marginTop: 8 }}>
              {thisWeek}
            </p>
          </div>
          <div className="panel">
            <span className="text-small">Screenings on record</span>
            <p className="text-h2" style={{ marginTop: 8 }}>
              {assessments.length}
            </p>
          </div>
        </div>

        <h2 className="text-h2" style={{ margin: '52px 0 24px' }}>
          Composite score
        </h2>
        <ProgressChart assessments={assessments} />

        {Object.keys(domainSeries).length > 0 && (
          <>
            <h2 className="text-h2" style={{ margin: '52px 0 24px' }}>
              By domain
            </h2>
            <div className="progress-page__domains">
              {Object.entries(domainSeries).map(([domain, points]) => (
                <DomainTrend key={domain} domain={domain} points={points} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
