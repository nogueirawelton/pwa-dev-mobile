import { onAuthStateChanged, signOut } from "firebase/auth";
import { CircleNotch } from "phosphor-react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebase";
import { child, get, ref } from "firebase/database";
import { toast } from "react-toastify";

interface AuthContextProps {
  children: ReactNode;
}

interface User {
  createdAt: Date;
  email: string;
  name?: string;
  profileImage?: string;
}

interface AuthContext {
  user: User | null;
}

const AuthContext = createContext({} as AuthContext);

export function AuthContextProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        if (location.href.includes("admin")) {
          navigate("/login");
          return;
        }
      }

      if (user) {
        const userID = user.uid;

        try {
          const realtimeUserData = await get(child(ref(db), `users/${userID}`));

          setUser(realtimeUserData.val());
          navigate("/admin");
        } catch (err) {
          signOut(auth);
          navigate("/login");
          toast.error("Erro ao obter dados do usuário");
        }
      }
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="grid h-screen w-screen place-items-center">
        <CircleNotch className="h-10 w-10 animate-spin text-sky-500" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
