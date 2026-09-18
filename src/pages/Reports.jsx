import { AppNav } from '../components/Nav.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { BAND_LABELS, SIGNAL_COPY } from '../utils/scoring.js';
import './Reports.css';

export default function Reports() {
  const { activeChild, user, assessmentsForChild } = useAuth();
  const assessments = assessmentsForChild(activeChild.id);
  const latest = assessments[assessments.length - 1];

  return (
    <div className="reports-page">
      <div className="reports-page__no-print">
        <AppNav />
      </div>
      <div className="container reports-page__inner">
        <div className="reports-page__toolbar reports-page__no-print">
          <p className="text-small">Prepared for sharing with a teacher, tutor, or clinician.</p>
          <button type="button" className="btn btn-outline" onClick={() => window.print()}>
            Print / save as PDF
          </button>
        </div>

        {!latest ? (
          <p className="text-body">No completed screening yet, so there is nothing to report.</p>
        ) : (
          <div className="reports-page__doc panel">
            <div className="reports-page__doc-head">
              <div>
                <h1 className="text-h2">Reading screening summary</h1>
                <p className="text-small" style={{ marginTop: 6 }}>
                  {activeChild.name}, age {activeChild.age} &middot; Prepared by {user.name}
                </p>
              </div>
              <span className="text-small">{new Date(latest.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="reports-page__doc-section">
              <h3 className="text-h3">Overall signal</h3>
              <p className="text-body" style={{ marginTop: 10 }}>
                {SIGNAL_COPY[latest.overallSignal].heading}. {SIGNAL_COPY[latest.overallSignal].body}
              </p>
            </div>

            <div className="reports-page__doc-section">
              <h3 className="text-h3">Domain scores</h3>
              <table className="reports-page__table">
                <thead>
                  <tr>
                    <th>Domain</th>
                    <th>Score</th>
                    <th>Band</th>
                    <th>Items correct</th>
                  </tr>
                </thead>
                <tbody>
                  {latest.domainScores.map((d) => (
                    <tr key={d.domain}>
                      <td>{d.label}</td>
                      <td>{d.score} / 100</td>
                      <td>{BAND_LABELS[d.band]}</td>
                      <td>
                        {d.correct} / {d.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="reports-page__doc-section">
              <h3 className="text-h3">Screening history</h3>
              <table className="reports-page__table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Composite score</th>
                    <th>Signal</th>
                  </tr>
                </thead>
                <tbody>
                  {assessments.map((a) => (
                    <tr key={a.id}>
                      <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                      <td>{a.overallScore} / 100</td>
                      <td>{SIGNAL_COPY[a.overallSignal].heading}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-small reports-page__disclaimer">
              This report reflects the result of a screening tool, not a clinical diagnosis. Scores indicate
              relative strengths and domains that may benefit from closer attention. A formal diagnosis of
              dyslexia can only be made by a qualified professional following a complete evaluation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
