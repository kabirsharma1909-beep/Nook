import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sampleQuestions } from '../data/questions.js';
import './SampleAssessment.css';

export default function SampleAssessment() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);

  const question = sampleQuestions[index];
  const isLast = index === sampleQuestions.length - 1;

  function choose(i) {
    if (selected !== null) return;
    setSelected(i);
  }

  function next() {
    if (isLast) return;
    setIndex((v) => v + 1);
    setSelected(null);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
  }

  return (
    <div className="sample-assessment">
      <div className="sample-assessment__tag pill">Sample &mdash; not scored</div>

      <p className="sample-assessment__progress text-small">
        Question {index + 1} of {sampleQuestions.length}
      </p>

      <p className="sample-assessment__prompt text-h3">{question.prompt}</p>

      <div className="sample-assessment__options">
        {question.options.map((opt, i) => {
          const isChosen = selected === i;
          const isCorrect = i === question.correctIndex;
          let state = '';
          if (selected !== null && isChosen) state = isCorrect ? 'is-correct' : 'is-chosen';
          if (selected !== null && !isChosen && isCorrect) state = 'is-reveal';
          return (
            <button
              key={opt}
              type="button"
              className={`sample-assessment__option ${state}`}
              onClick={() => choose(i)}
              disabled={selected !== null}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="sample-assessment__feedback">
          <p className="text-small">
            {selected === question.correctIndex
              ? 'That kind of sound-matching is exactly what the full screening measures.'
              : 'No penalty here — the full assessment adapts and gives more practice like this.'}
          </p>
          {!isLast ? (
            <button type="button" className="btn btn-outline" onClick={next}>
              Next question
            </button>
          ) : (
            <div className="sample-assessment__end">
              <p className="text-small">That's the idea. The full screening covers five reading domains and adapts as your child answers.</p>
              <div className="sample-assessment__end-actions">
                <Link to="/create-account" className="btn btn-primary">
                  Create a profile
                </Link>
                <button type="button" className="btn btn-ghost" onClick={restart}>
                  Try the sample again
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
