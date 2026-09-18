import { Link } from 'react-router-dom';
import { AppNav } from '../components/Nav.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import SkillProfile from '../components/SkillProfile.jsx';
import ProgressChart from '../components/ProgressChart.jsx';
import ExerciseCard from '../components/ExerciseCard.jsx';
import { exercises } from '../data/exercises.js';
import { recommendedDomains, SIGNAL_COPY } from '../utils/scoring.js';
import './Dashboard.css';

export default function Dashboard() {
  const { activeChild, assessmentsForChild, exerciseLogsForChild, logExerciseCompletion } = useAuth();
  const assessments = assessmentsForChild(activeChild.id);
  const latest = assessments[assessments.length - 1];
  const logs = exerciseLogsForChild(activeChild.id);
  const completedIds = new Set(logs.map((l) => l.exerciseId));

  const todaysExercises = latest
    ? recommendedDomains(latest.domainScores)
        .slice(0, 2)
        .flatMap((domain) => exercises.filter((e) => e.domain === domain).slice(0, 1))
    : exercises.slice(0, 2);

  return (
    <div className="dashboard">
      <AppNav />
      <div className="container dashboard__inner">
        <div className="dashboard__header">
          <div>
            <span className="text-small">Reading profile for</span>
            <h1 className="text-h1">{activeChild.name}</h1>
          </div>
          <div className="dashboard__header-meta">
            <div>
              <span className="text-small">Age</span>
              <p className="serif">{activeChild.age}</p>
            </div>
            <div>
              <span className="text-small">Last assessment</span>
              <p className="serif">
                {latest ? new Date(latest.createdAt).toLocaleDateString() : 'Not yet taken'}
              </p>
            </div>
            <div>
              <span className="text-small">Current signal</span>
              <p className="serif">{latest ? SIGNAL_COPY[latest.overallSignal].heading : '—'}</p>
            </div>
          </div>
        </div>

        {!latest ? (
          <div className="dashboard__empty panel">
            <h2 className="text-h2">Start with a baseline screening</h2>
            <p className="text-body" style={{ margin: '14px 0 24px', maxWidth: '52ch' }}>
              A first screening takes about 10 to 15 minutes and covers five reading domains. It builds the
              profile everything else on this dashboard is based on.
            </p>
            <Link to="/assessment" className="btn btn-primary">
              Start screening
            </Link>
          </div>
        ) : (
          <>
            <section className="dashboard__section">
              <div className="section-head" style={{ marginBottom: 28 }}>
                <h2 className="text-h2">Reading profile</h2>
                <Link to="/assessment" className="btn btn-outline">
                  Retake screening
                </Link>
              </div>
              <SkillProfile domainScores={latest.domainScores} />
            </section>

            <section className="dashboard__section">
              <div className="section-head" style={{ marginBottom: 28 }}>
                <h2 className="text-h2">Continue your plan</h2>
                <Link to="/exercises" className="text-small">
                  View all exercises
                </Link>
              </div>
              <p className="text-small" style={{ marginBottom: 18 }}>
                Today's exercises
              </p>
              <div className="dashboard__exercise-list">
                {todaysExercises.map((ex) => (
                  <ExerciseCard
                    key={ex.id}
                    exercise={ex}
                    completed={completedIds.has(ex.id)}
                    onComplete={(id) => logExerciseCompletion({ childId: activeChild.id, exerciseId: id })}
                  />
                ))}
              </div>
            </section>

            <section className="dashboard__section">
              <h2 className="text-h2" style={{ marginBottom: 28 }}>
                Progress over time
              </h2>
              <ProgressChart assessments={assessments} />
            </section>

            <section className="dashboard__section">
              <h2 className="text-h2" style={{ marginBottom: 20 }}>
                Recent assessment activity
              </h2>
              <div className="dashboard__activity">
                {[...assessments].reverse().map((a) => (
                  <Link to={`/results/${a.id}`} key={a.id} className="dashboard__activity-row">
                    <span className="serif">{new Date(a.createdAt).toLocaleDateString()}</span>
                    <span className="text-small">Composite score: {a.overallScore}</span>
                    <span className="text-small">{SIGNAL_COPY[a.overallSignal].heading}</span>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
