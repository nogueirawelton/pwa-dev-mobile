import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { DefaultTemplate } from './templates/DefaultTemplate';
import { Dashboard } from './pages/Dashboard';
import { NotFound } from './pages/NotFound';

export function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Login />}
      />
      <Route
        path="/admin"
        element={<DefaultTemplate />}>
        <Route
          path="/admin/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/admin/notifications"
          element={<p>Notifications</p>}
        />
      </Route>
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}
