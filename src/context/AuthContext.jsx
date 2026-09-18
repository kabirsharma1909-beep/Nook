import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { loadDb, saveDb, uid, getSession, setSession } from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children: appChildren }) {
  const [db, setDb] = useState(loadDb);
  const [userId, setUserId] = useState(getSession);
  const [activeChildId, setActiveChildId] = useState(() => {
    try {
      return localStorage.getItem('rp:activeChild');
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    saveDb(db);
  }, [db]);

  const user = useMemo(() => db.users.find((u) => u.id === userId) || null, [db, userId]);

  const childProfiles = useMemo(
    () => db.children.filter((c) => c.userId === userId),
    [db, userId]
  );

  const activeChild = useMemo(
    () => childProfiles.find((c) => c.id === activeChildId) || childProfiles[0] || null,
    [childProfiles, activeChildId]
  );

  const signUp = useCallback(({ email, password, role, name }) => {
    const existing = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { ok: false, error: 'An account with this email already exists.' };
    }
    const newUser = { id: uid('user'), email, password, role, name, createdAt: Date.now() };
    setDb((prev) => ({ ...prev, users: [...prev.users, newUser] }));
    setUserId(newUser.id);
    setSession(newUser.id);
    return { ok: true, user: newUser };
  }, [db]);

  const logIn = useCallback(({ email, password }) => {
    const match = db.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!match) {
      return { ok: false, error: 'That email and password combination was not found.' };
    }
    setUserId(match.id);
    setSession(match.id);
    return { ok: true, user: match };
  }, [db]);

  const logOut = useCallback(() => {
    setUserId(null);
    setSession(null);
    setActiveChildId(null);
    try {
      localStorage.removeItem('rp:activeChild');
    } catch (e) {
      /* ignore */
    }
  }, []);

  const createChildProfile = useCallback(({ name, age, grade, language }) => {
    if (!userId) return { ok: false, error: 'Not signed in.' };
    const child = {
      id: uid('child'),
      userId,
      name,
      age: Number(age),
      grade,
      language: language || 'English',
      createdAt: Date.now()
    };
    setDb((prev) => ({ ...prev, children: [...prev.children, child] }));
    setActiveChildId(child.id);
    try {
      localStorage.setItem('rp:activeChild', child.id);
    } catch (e) {
      /* ignore */
    }
    return { ok: true, child };
  }, [userId]);

  const selectChild = useCallback((childId) => {
    setActiveChildId(childId);
    try {
      localStorage.setItem('rp:activeChild', childId);
    } catch (e) {
      /* ignore */
    }
  }, []);

  const saveAssessment = useCallback((assessment) => {
    const record = { id: uid('assess'), createdAt: Date.now(), ...assessment };
    setDb((prev) => ({ ...prev, assessments: [...prev.assessments, record] }));
    return record;
  }, []);

  const assessmentsForChild = useCallback(
    (childId) => db.assessments.filter((a) => a.childId === childId).sort((a, b) => a.createdAt - b.createdAt),
    [db]
  );

  const logExerciseCompletion = useCallback((log) => {
    const record = { id: uid('exlog'), createdAt: Date.now(), ...log };
    setDb((prev) => ({ ...prev, exerciseLogs: [...prev.exerciseLogs, record] }));
    return record;
  }, []);

  const exerciseLogsForChild = useCallback(
    (childId) => db.exerciseLogs.filter((l) => l.childId === childId).sort((a, b) => a.createdAt - b.createdAt),
    [db]
  );

  const value = {
    user,
    isAuthenticated: !!user,
    childProfiles,
    activeChild,
    signUp,
    logIn,
    logOut,
    createChildProfile,
    selectChild,
    saveAssessment,
    assessmentsForChild,
    logExerciseCompletion,
    exerciseLogsForChild
  };

  return <AuthContext.Provider value={value}>{appChildren}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
