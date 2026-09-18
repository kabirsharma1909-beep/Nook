import { useEffect, useRef, useState } from 'react';
import './AssessmentQuestion.css';

export default function AssessmentQuestion({ question, index, total, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const startRef = useRef(Date.now());

  useEffect(() => {
    startRef.current = Date.now();
    setSelected(null);
  }, [question.id]);

  function choose(i) {
    if (selected !== null) return;
    setSelected(i);
    const responseTimeMs = Date.now() - startRef.current;
    const correct = i === question.correctIndex;
    window.setTimeout(() => {
      onAnswer({ questionId: question.id, domain: question.domain, correct, responseTimeMs });
    }, 480);
  }

  return (
    <div className="assessment-question">
      <div className="assessment-question__progress">
        <div className="assessment-question__progress-track">
          <div
            className="assessment-question__progress-fill"
            style={{ width: `${(index / total) * 100}%` }}
          />
        </div>
        <span className="text-small">
          Task {index + 1} of {total}
        </span>
      </div>

      <p className="assessment-question__prompt">{question.prompt}</p>

      <div className="assessment-question__options">
        {question.options.map((opt, i) => {
          let state = '';
          if (selected !== null) {
            if (i === selected && i === question.correctIndex) state = 'is-correct';
            else if (i === selected) state = 'is-incorrect';
            else if (i === question.correctIndex) state = 'is-reveal';
          }
          return (
            <button
              key={opt}
              type="button"
              className={`assessment-question__option ${state}`}
              onClick={() => choose(i)}
              disabled={selected !== null}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
