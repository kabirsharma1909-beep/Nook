import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import CreateAccount from './pages/CreateAccount.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ChildProfileSetup from './pages/ChildProfileSetup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Assessment from './pages/Assessment.jsx';
import Results from './pages/Results.jsx';
import Exercises from './pages/Exercises.jsx';
import Progress from './pages/Progress.jsx';
import Reports from './pages/Reports.jsx';

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function RequireChild({ children }) {
  const { isAuthenticated, activeChild } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!activeChild) return <Navigate to="/setup-child" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/setup-child"
        element={
          <RequireAuth>
            <ChildProfileSetup />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RequireChild>
            <Dashboard />
          </RequireChild>
        }
      />
      <Route
        path="/assessment"
        element={
          <RequireChild>
            <Assessment />
          </RequireChild>
        }
      />
      <Route
        path="/results/:assessmentId"
        element={
          <RequireChild>
            <Results />
          </RequireChild>
        }
      />
      <Route
        path="/exercises"
        element={
          <RequireChild>
            <Exercises />
          </RequireChild>
        }
      />
      <Route
        path="/progress"
        element={
          <RequireChild>
            <Progress />
          </RequireChild>
        }
      />
      <Route
        path="/reports"
        element={
          <RequireChild>
            <Reports />
          </RequireChild>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
