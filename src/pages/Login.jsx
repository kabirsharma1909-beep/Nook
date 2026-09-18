import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AuthLayout from '../components/AuthLayout.jsx';

export default function Login() {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const result = logIn({ email, password });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate('/dashboard');
  }

  return (
    <AuthLayout title="Log in" subtitle="Pick up where you left off.">
      <form onSubmit={handleSubmit}>
        {error && <p className="text-small" style={{ color: 'var(--danger)', marginBottom: 16 }}>{error}</p>}
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
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Log in
        </button>
      </form>
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/forgot-password" className="text-small">
          Forgot password?
        </Link>
        <Link to="/create-account" className="text-small">
          Create an account
        </Link>
      </div>
      <p className="text-small" style={{ marginTop: 28, color: 'var(--ink-faint)' }}>
        This is a local prototype. Accounts are stored only in this browser, not on a server.
      </p>
    </AuthLayout>
  );
}
