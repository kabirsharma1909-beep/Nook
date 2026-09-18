import { useState, useRef, useEffect } from 'react';
import { useTheme, PALETTES } from '../context/ThemeContext.jsx';
import './ThemeSwitcher.css';

export default function ThemeSwitcher({ align = 'right' }) {
  const { palette, setPalette, mode, toggleMode } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="theme-switcher" ref={ref}>
      <button
        type="button"
        className="theme-switcher__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Theme settings"
      >
        <span className="theme-switcher__dot" data-swatch={palette} />
        <span className="theme-switcher__mode-label">{mode === 'light' ? 'Light' : 'Dark'}</span>
      </button>

      {open && (
        <div className={`theme-switcher__panel theme-switcher__panel--${align}`} role="menu">
          <div className="theme-switcher__group-label">Appearance</div>
          <div className="theme-switcher__mode-row">
            <button
              type="button"
              className={`theme-switcher__mode-btn ${mode === 'light' ? 'is-active' : ''}`}
              onClick={toggleMode}
              aria-pressed={mode === 'light'}
            >
              Light
            </button>
            <button
              type="button"
              className={`theme-switcher__mode-btn ${mode === 'dark' ? 'is-active' : ''}`}
              onClick={toggleMode}
              aria-pressed={mode === 'dark'}
            >
              Dark
            </button>
          </div>

          <div className="theme-switcher__group-label">Palette</div>
          <div className="theme-switcher__palette-list">
            {PALETTES.map((p) => (
              <button
                type="button"
                key={p.id}
                className={`theme-switcher__palette-btn ${palette === p.id ? 'is-active' : ''}`}
                onClick={() => setPalette(p.id)}
                role="menuitemradio"
                aria-checked={palette === p.id}
              >
                <span className="theme-switcher__dot" data-swatch={p.id} />
                <span>
                  <span className="theme-switcher__palette-name">{p.label}</span>
                  <span className="theme-switcher__palette-desc">{p.description}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
