import { User, onAuthStateChanged } from "firebase/auth";
import { CircleNotch } from "phosphor-react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContext {
  user: User | null;
}

const AuthContext = createContext({} as AuthContext);

export function AuthContextProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  function authUser(user: User | null) {
    setUser(user);
    navigate("/admin");
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log(user);
      if (!user || !user.emailVerified) {
        if (location.href.includes("admin")) {
          navigate("/login");
          return;
        }
      }

      if (user && user.emailVerified) {
        authUser(user);
        console.log("Redirecting to Admin");
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
