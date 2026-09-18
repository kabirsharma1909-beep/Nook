import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext(null);

export const PALETTES = [
  { id: 'paper', label: 'Paper', description: 'Warm paper, ink, muted red' },
  { id: 'charcoal', label: 'Charcoal', description: 'Charcoal, cream, muted green' },
  { id: 'slate', label: 'Slate', description: 'Soft blue, off-white, navy' }
];

const PALETTE_KEY = 'rp:palette';
const MODE_KEY = 'rp:mode';

function readStoredPalette() {
  try {
    const v = localStorage.getItem(PALETTE_KEY);
    if (v && PALETTES.some((p) => p.id === v)) return v;
  } catch (e) {
    /* localStorage unavailable */
  }
  return 'paper';
}

function readStoredMode() {
  try {
    const v = localStorage.getItem(MODE_KEY);
    if (v === 'light' || v === 'dark') return v;
  } catch (e) {
    /* localStorage unavailable */
  }
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

export function ThemeProvider({ children }) {
  const [palette, setPaletteState] = useState(readStoredPalette);
  const [mode, setModeState] = useState(readStoredMode);

  useEffect(() => {
    document.documentElement.setAttribute('data-palette', palette);
  }, [palette]);

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode);
  }, [mode]);

  const setPalette = useCallback((next) => {
    setPaletteState(next);
    try {
      localStorage.setItem(PALETTE_KEY, next);
    } catch (e) {
      /* ignore */
    }
  }, []);

  const setMode = useCallback((next) => {
    setModeState(next);
    try {
      localStorage.setItem(MODE_KEY, next);
    } catch (e) {
      /* ignore */
    }
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === 'light' ? 'dark' : 'light');
  }, [mode, setMode]);

  return (
    <ThemeContext.Provider value={{ palette, setPalette, mode, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
