import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.jsx';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <AuthLayout title="Check your email" subtitle={`If an account exists for ${email}, a reset link is on its way.`}>
        <p className="text-small" style={{ color: 'var(--ink-faint)', marginBottom: 24 }}>
          This is a local prototype, so no email is actually sent.
        </p>
        <Link to="/login" className="btn btn-outline btn-block">
          Back to log in
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset your password" subtitle="Enter the email on your account and we'll send a reset link.">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Send reset link
        </button>
      </form>
      <p className="text-small" style={{ marginTop: 20 }}>
        <Link to="/login">Back to log in</Link>
      </p>
    </AuthLayout>
  );
}
