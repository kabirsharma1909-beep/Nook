import { Link } from 'react-router-dom';
import SkillProfile from './SkillProfile.jsx';
import { SIGNAL_COPY, recommendedDomains } from '../utils/scoring.js';
import { DOMAINS } from '../data/questions.js';
import './ResultsProfile.css';

export default function ResultsProfile({ result, childName }) {
  const signal = SIGNAL_COPY[result.overallSignal];
  const toPractice = recommendedDomains(result.domainScores);

  return (
    <div className="results-profile">
      <div className={`results-profile__signal results-profile__signal--${result.overallSignal}`}>
        <span className="text-small">Screening result for {childName}</span>
        <h2 className="text-h2">{signal.heading}</h2>
        <p className="text-body">{signal.body}</p>
      </div>

      <div className="results-profile__body">
        <div className="results-profile__scores">
          <h3 className="text-h3">Reading profile</h3>
          <SkillProfile domainScores={result.domainScores} />
        </div>

        <div className="results-profile__next">
          <h3 className="text-h3">Where to focus next</h3>
          {toPractice.length === 0 ? (
            <p className="text-body">Every domain came back strong in this screening. A repeat screening in a few months keeps the profile current.</p>
          ) : (
            <ul className="results-profile__list">
              {toPractice.map((d) => (
                <li key={d}>{DOMAINS[d]?.label}</li>
              ))}
            </ul>
          )}
          <Link to="/exercises" className="btn btn-primary">
            Go to exercises
          </Link>
        </div>
      </div>

      <p className="text-small results-profile__disclaimer">
        This is a screening result, not a medical diagnosis. Only a qualified professional &mdash;
        such as a pediatrician, school psychologist, or reading specialist &mdash; can diagnose dyslexia.
      </p>
    </div>
  );
}
