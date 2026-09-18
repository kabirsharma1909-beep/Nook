import { useEffect, useMemo, useRef, useState } from 'react';
import { shuffleQuestionOptions } from '../utils/shuffle.js';
import './AssessmentQuestion.css';

export default function AssessmentQuestion({ question: rawQuestion, index, total, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const startRef = useRef(Date.now());

  // Shuffle once per question (not on every render) so the correct
  // answer isn't always in the same position, and doesn't re-shuffle
  // out from under the user after they've clicked.
  const question = useMemo(() => shuffleQuestionOptions(rawQuestion), [rawQuestion.id]);

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
