import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher.jsx';
import './AuthLayout.css';

export default function AuthLayout({ eyebrow, title, subtitle, children, wide = false }) {
  return (
    <div className="auth-layout">
      <header className="auth-layout__nav">
        <div className="container auth-layout__nav-row">
          <Link to="/" className="nav__brand">
            Nook
          </Link>
          <ThemeSwitcher />
        </div>
      </header>
      <main className="auth-layout__main">
        <div className={`auth-layout__panel ${wide ? 'is-wide' : ''}`}>
          {eyebrow && <p className="text-small auth-layout__eyebrow">{eyebrow}</p>}
          <h1 className="text-h1">{title}</h1>
          {subtitle && <p className="text-body" style={{ marginTop: 12 }}>{subtitle}</p>}
          <div className="auth-layout__body">{children}</div>
        </div>
      </main>
    </div>
  );
}
