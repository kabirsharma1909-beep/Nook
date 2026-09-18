import { useState } from 'react';
import { DOMAINS } from '../data/questions.js';
import './ExerciseCard.css';

export default function ExerciseCard({ exercise, completed = false, onComplete }) {
  const [expanded, setExpanded] = useState(false);
  const [done, setDone] = useState(completed);

  function handleComplete() {
    setDone(true);
    onComplete?.(exercise.id);
  }

  return (
    <div className={`exercise-card ${done ? 'is-done' : ''}`}>
      <div className="exercise-card__head" onClick={() => setExpanded((v) => !v)}>
        <div>
          <span className="text-small">{DOMAINS[exercise.domain]?.label}</span>
          <h4 className="text-h3">{exercise.title}</h4>
        </div>
        <div className="exercise-card__meta">
          <span className="text-small">{exercise.minutes} min</span>
          {done && <span className="pill exercise-card__done-pill">Complete</span>}
        </div>
      </div>

      <p className="text-body">{exercise.description}</p>

      {expanded && (
        <ol className="exercise-card__steps">
          {exercise.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      )}

      <div className="exercise-card__actions">
        <button type="button" className="btn-ghost" onClick={() => setExpanded((v) => !v)}>
          {expanded ? 'Hide steps' : 'Show steps'}
        </button>
        {!done && (
          <button type="button" className="btn btn-outline" onClick={handleComplete}>
            Mark complete
          </button>
        )}
      </div>
    </div>
  );
}
