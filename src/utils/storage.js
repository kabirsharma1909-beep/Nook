// Lightweight localStorage-backed persistence layer standing in for a
// backend during this MVP. Everything funnels through here so it can be
// swapped for real API calls later without touching component code.

const DB_KEY = 'rp:db';
const SESSION_KEY = 'rp:session';

function emptyDb() {
  return {
    users: [],
    children: [],
    assessments: [],
    exerciseLogs: []
  };
}

export function loadDb() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) return emptyDb();
    const parsed = JSON.parse(raw);
    return { ...emptyDb(), ...parsed };
  } catch (e) {
    return emptyDb();
  }
}

export function saveDb(db) {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (e) {
    /* ignore write failures (e.g. private browsing) */
  }
}

export function uid(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function getSession() {
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch (e) {
    return null;
  }
}

export function setSession(userId) {
  try {
    if (userId) localStorage.setItem(SESSION_KEY, userId);
    else localStorage.removeItem(SESSION_KEY);
  } catch (e) {
    /* ignore */
  }
}
