import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppNav } from '../components/Nav.jsx';
import AssessmentQuestion from '../components/AssessmentQuestion.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { fullAssessment } from '../data/questions.js';
import { scoreAssessment } from '../utils/scoring.js';
import './Assessment.css';

export default function Assessment() {
  const { activeChild, saveAssessment } = useAuth();
  const navigate = useNavigate();

  const [answeredIds, setAnsweredIds] = useState([]);
  const [responses, setResponses] = useState([]);
  const [targetDifficulty, setTargetDifficulty] = useState(2);
  const [started, setStarted] = useState(false);
  const [finishing, setFinishing] = useState(false);

  const total = fullAssessment.length;

  const currentQuestion = useMemo(() => {
    const remaining = fullAssessment.filter((q) => !answeredIds.includes(q.id));
    if (remaining.length === 0) return null;
    return remaining.reduce(
      (best, q) => (Math.abs(q.difficulty - targetDifficulty) < Math.abs(best.difficulty - targetDifficulty) ? q : best),
      remaining[0]
    );
  }, [answeredIds, targetDifficulty]);

  function handleAnswer(response) {
    const nextResponses = [...responses, response];
    setResponses(nextResponses);
    setAnsweredIds((prev) => [...prev, response.questionId]);
    setTargetDifficulty((prev) => {
      const next = prev + (response.correct ? 0.5 : -0.5);
      return Math.min(3, Math.max(1, next));
    });

    if (nextResponses.length === total) {
      setFinishing(true);
      const result = scoreAssessment(nextResponses);
      const record = saveAssessment({
        childId: activeChild.id,
        domainScores: result.domainScores,
        overallScore: result.overallScore,
        overallSignal: result.overallSignal,
        responses: nextResponses
      });
      window.setTimeout(() => navigate(`/results/${record.id}`), 700);
    }
  }

  return (
    <div className="assessment-page">
      <AppNav />
      <div className="container assessment-page__inner">
        {!started ? (
          <div className="assessment-page__intro panel">
            <span className="text-small">Screening &middot; {activeChild.name}</span>
            <h1 className="text-h1" style={{ margin: '12px 0 18px' }}>
              Ready to begin?
            </h1>
            <p className="text-body measure" style={{ marginBottom: 28 }}>
              This takes about 10 to 15 minutes. There is one task on screen at a time, and difficulty
              adjusts automatically based on how {activeChild.name} answers. There's no timer pressure —
              take it at a comfortable pace.
            </p>
            <button type="button" className="btn btn-primary" onClick={() => setStarted(true)}>
              Start screening
            </button>
          </div>
        ) : finishing ? (
          <div className="assessment-page__finishing">
            <p className="text-lead">Building the reading profile&hellip;</p>
          </div>
        ) : currentQuestion ? (
          <AssessmentQuestion
            question={currentQuestion}
            index={answeredIds.length}
            total={total}
            onAnswer={handleAnswer}
          />
        ) : null}
      </div>
    </div>
  );
}
