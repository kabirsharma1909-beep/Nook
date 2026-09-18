import { useState } from 'react';
import { AppNav } from '../components/Nav.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import ExerciseCard from '../components/ExerciseCard.jsx';
import { exercises } from '../data/exercises.js';
import { DOMAINS } from '../data/questions.js';
import { recommendedDomains } from '../utils/scoring.js';
import './Exercises.css';

export default function Exercises() {
  const { activeChild, assessmentsForChild, exerciseLogsForChild, logExerciseCompletion } = useAuth();
  const assessments = assessmentsForChild(activeChild.id);
  const latest = assessments[assessments.length - 1];
  const logs = exerciseLogsForChild(activeChild.id);
  const completedIds = new Set(logs.map((l) => l.exerciseId));
  const priority = latest ? recommendedDomains(latest.domainScores) : [];

  const [filter, setFilter] = useState('all');

  const domainKeys = Object.keys(DOMAINS);
  const visible = filter === 'all' ? exercises : exercises.filter((e) => e.domain === filter);

  return (
    <div className="exercises-page">
      <AppNav />
      <div className="container exercises-page__inner">
        <div className="section-head" style={{ marginBottom: 32 }}>
          <div>
            <h1 className="text-h1">Exercises</h1>
            <p className="text-body" style={{ marginTop: 10 }}>
              Short, focused practice mapped to the domains from {activeChild.name}'s screening.
            </p>
          </div>
        </div>

        <div className="exercises-page__filters">
          <button
            type="button"
            className={`exercises-page__filter ${filter === 'all' ? 'is-active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          {domainKeys.map((d) => (
            <button
              key={d}
              type="button"
              className={`exercises-page__filter ${filter === d ? 'is-active' : ''}`}
              onClick={() => setFilter(d)}
            >
              {DOMAINS[d].label}
              {priority.includes(d) && <span className="exercises-page__priority-dot" aria-hidden="true" />}
            </button>
          ))}
        </div>

        <div className="exercises-page__grid">
          {visible.map((ex) => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              completed={completedIds.has(ex.id)}
              onComplete={(id) => logExerciseCompletion({ childId: activeChild.id, exerciseId: id })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
