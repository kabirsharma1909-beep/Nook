import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AuthLayout from '../components/AuthLayout.jsx';
import './CreateAccount.css';

export default function CreateAccount() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('parent');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (password.length < 6) {
      setError('Use a password with at least 6 characters.');
      return;
    }
    const result = signUp({ name, email, password, role });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate('/setup-child');
  }

  return (
    <AuthLayout
      eyebrow={`Step ${step} of 2`}
      title="Create your account"
      subtitle={step === 1 ? 'Who is setting this up?' : 'A few details to secure your account.'}
    >
      {step === 1 && (
        <div className="create-account__role-grid">
          <button
            type="button"
            className={`create-account__role ${role === 'parent' ? 'is-active' : ''}`}
            onClick={() => setRole('parent')}
          >
            Parent / Guardian
          </button>
          <button
            type="button"
            className={`create-account__role ${role === 'teacher' ? 'is-active' : ''}`}
            onClick={() => setRole('teacher')}
          >
            Teacher
          </button>
          <button type="button" className="btn btn-primary btn-block" onClick={() => setStep(2)}>
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="create-account__form">
          {error && <p className="text-small" style={{ color: 'var(--danger)', marginBottom: 16 }}>{error}</p>}
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="field-hint">At least 6 characters.</span>
          </div>
          <div className="create-account__form-actions">
            <button type="button" className="btn-ghost" onClick={() => setStep(1)}>
              Back
            </button>
            <button type="submit" className="btn btn-primary">
              Create account
            </button>
          </div>
        </form>
      )}

      <p className="text-small" style={{ marginTop: 28 }}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </AuthLayout>
  );
}
