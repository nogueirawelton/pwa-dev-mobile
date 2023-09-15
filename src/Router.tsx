import { Routes, Route } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { AdminLayout } from "./layouts/AdminLayout";
import { HomeLayout } from "./layouts/HomeLayout";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin/notifications" element={<p>Notifications</p>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
