import { Link, useParams, Navigate } from 'react-router-dom';
import { AppNav } from '../components/Nav.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import ResultsProfile from '../components/ResultsProfile.jsx';
import './Results.css';

export default function Results() {
  const { assessmentId } = useParams();
  const { activeChild, assessmentsForChild } = useAuth();
  const assessment = assessmentsForChild(activeChild.id).find((a) => a.id === assessmentId);

  if (!assessment) return <Navigate to="/dashboard" replace />;

  return (
    <div className="results-page">
      <AppNav />
      <div className="container results-page__inner">
        <div className="results-page__head">
          <Link to="/dashboard" className="text-small">
            &larr; Back to dashboard
          </Link>
          <span className="text-small">{new Date(assessment.createdAt).toLocaleString()}</span>
        </div>
        <ResultsProfile result={assessment} childName={activeChild.name} />
        <div className="results-page__actions">
          <Link to="/assessment" className="btn btn-outline">
            Take another screening
          </Link>
          <Link to="/reports" className="btn btn-primary">
            View full report
          </Link>
        </div>
      </div>
    </div>
  );
}
