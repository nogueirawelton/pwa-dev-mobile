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
        <Route path="/admin/transactions" element={<p>Transactions</p>} />
        <Route path="/admin/schedules" element={<p>Schedules</p>} />
        <Route path="/admin/wallets" element={<p>Wallets</p>} />
        <Route path="/admin/profile" element={<p>Profile</p>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
