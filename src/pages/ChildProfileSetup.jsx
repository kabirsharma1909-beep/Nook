import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AuthLayout from '../components/AuthLayout.jsx';

const GRADES = ['Kindergarten', '1st grade', '2nd grade', '3rd grade', '4th grade', '5th grade'];
const LANGUAGES = ['English', 'Spanish', 'French'];

export default function ChildProfileSetup() {
  const { createChildProfile } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('7');
  const [grade, setGrade] = useState(GRADES[1]);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Add a name to continue.');
      return;
    }
    createChildProfile({ name: name.trim(), age, grade, language });
    navigate('/dashboard');
  }

  return (
    <AuthLayout
      eyebrow="One more step"
      title="Create a child profile"
      subtitle="Just enough to tailor the screening. Nothing else is required."
    >
      <form onSubmit={handleSubmit}>
        {error && <p className="text-small" style={{ color: 'var(--danger)', marginBottom: 16 }}>{error}</p>}
        <div className="field">
          <label htmlFor="child-name">Name</label>
          <input id="child-name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="child-age">Age</label>
            <select id="child-age" value={age} onChange={(e) => setAge(e.target.value)}>
              {Array.from({ length: 9 }, (_, i) => i + 5).map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="child-grade">Grade</label>
            <select id="child-grade" value={grade} onChange={(e) => setGrade(e.target.value)}>
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="child-language">Assessment language</label>
          <select id="child-language" value={language} onChange={(e) => setLanguage(e.target.value)}>
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <span className="field-hint">
            Only English has fully implemented assessment content in this preview.
          </span>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Go to dashboard
        </button>
      </form>
    </AuthLayout>
  );
}
