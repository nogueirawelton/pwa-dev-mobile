import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getAuth, signOut } from "firebase/auth";
import { Dashboard } from "../pages/Dashboard";

export function AdminLayout() {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const auth = getAuth();
  const navigate = useNavigate();

  return (
    <div className="text-white">
      <aside>
        {user && (
          <button onClick={() => signOut(auth).then(() => navigate("/"))}>
            Sair
          </button>
        )}
      </aside>
      <main>{pathname == "/admin" ? <Dashboard /> : <Outlet />}</main>
    </div>
  );
}
