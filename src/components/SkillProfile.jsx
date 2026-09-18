import { BAND_LABELS } from '../utils/scoring.js';
import './SkillProfile.css';

export default function SkillProfile({ domainScores, compact = false }) {
  if (!domainScores || domainScores.length === 0) {
    return <p className="text-body">No screening completed yet.</p>;
  }

  return (
    <div className={`skill-profile ${compact ? 'is-compact' : ''}`}>
      {domainScores.map((d) => (
        <div className="skill-profile__row" key={d.domain}>
          <div className="skill-profile__row-head">
            <span className="skill-profile__label">{d.label}</span>
            <span className={`skill-profile__band skill-profile__band--${d.band}`}>
              {BAND_LABELS[d.band]}
            </span>
          </div>
          <div className="skill-profile__track">
            <div
              className={`skill-profile__fill skill-profile__fill--${d.band}`}
              style={{ width: `${Math.max(d.score, 4)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
