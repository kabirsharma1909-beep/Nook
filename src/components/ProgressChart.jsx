import './ProgressChart.css';

export default function ProgressChart({ assessments }) {
  if (!assessments || assessments.length === 0) {
    return (
      <div className="progress-chart progress-chart--empty">
        <p className="text-body">No assessments yet. Complete a screening to start a trend line.</p>
      </div>
    );
  }

  const w = 640;
  const h = 220;
  const pad = 28;
  const scores = assessments.map((a) => a.overallScore);
  const max = 100;
  const min = 0;

  const coords = assessments.map((a, i) => {
    const x = assessments.length === 1 ? w / 2 : pad + (i / (assessments.length - 1)) * (w - pad * 2);
    const y = h - pad - ((a.overallScore - min) / (max - min)) * (h - pad * 2);
    return [x, y];
  });

  const path = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const area = `${path} L${coords[coords.length - 1][0].toFixed(1)},${h - pad} L${coords[0][0].toFixed(1)},${h - pad} Z`;

  return (
    <div className="progress-chart">
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Composite reading score across all assessments">
        <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="var(--line)" strokeWidth="1" />
        <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="var(--line)" strokeWidth="1" />
        <path d={area} fill="color-mix(in srgb, var(--accent) 12%, transparent)" stroke="none" />
        <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {coords.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={4} fill="var(--accent)" />
            <text x={x} y={h - pad + 18} textAnchor="middle" fontSize="10" fill="var(--ink-faint)">
              {new Date(assessments[i].createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </text>
          </g>
        ))}
      </svg>
      <div className="progress-chart__legend text-small">
        Latest composite score: <strong className="serif">{scores[scores.length - 1]}</strong> / 100
      </div>
    </div>
  );
}
