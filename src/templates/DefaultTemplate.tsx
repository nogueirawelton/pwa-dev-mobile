import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getAuth, signOut } from 'firebase/auth';

export function DefaultTemplate() {
  const { user } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();

  return (
    <div>
      <aside>
        {user && (
          <button onClick={() => signOut(auth).then(() => navigate('/'))}>
            Sair
          </button>
        )}
        <Link to="/teste">Teste</Link>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
