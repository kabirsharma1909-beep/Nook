import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ThemeSwitcher from './ThemeSwitcher.jsx';
import './Nav.css';

export function MarketingNav() {
  const { isAuthenticated } = useAuth();
  return (
    <header className="nav nav--marketing">
      <div className="container nav__row">
        <Link to="/" className="nav__brand">
          Nook
        </Link>
        <nav className="nav__links">
          <a href="#what-is-dyslexia">About</a>
          <a href="#how-it-works">How it works</a>
          <a href="#try-it">Try a sample</a>
        </nav>
        <div className="nav__actions">
          <ThemeSwitcher />
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn btn-outline">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="nav__text-link">
                Log in
              </Link>
              <Link to="/create-account" className="btn btn-primary">
                Create a profile
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function AppNav() {
  const { user, activeChild, childProfiles, selectChild, logOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="nav nav--app">
      <div className="container nav__row">
        <Link to="/dashboard" className="nav__brand">
          Nook
        </Link>
        <nav className="nav__links">
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Dashboard
          </NavLink>
          <NavLink to="/exercises" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Exercises
          </NavLink>
          <NavLink to="/progress" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Progress
          </NavLink>
          <NavLink to="/reports" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Reports
          </NavLink>
        </nav>
        <div className="nav__actions">
          {childProfiles.length > 1 && (
            <select
              className="nav__child-select"
              value={activeChild?.id || ''}
              onChange={(e) => selectChild(e.target.value)}
              aria-label="Select child profile"
            >
              {childProfiles.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
          <ThemeSwitcher />
          <div className="nav__user">
            <span className="text-small">{user?.name}</span>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => {
                logOut();
                navigate('/');
              }}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
