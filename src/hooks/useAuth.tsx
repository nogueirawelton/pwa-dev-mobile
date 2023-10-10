import { onAuthStateChanged } from "firebase/auth";
import { CircleNotch } from "phosphor-react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { child, get, ref } from "firebase/database";
import { User } from "../@types/User";

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

  useEffect(() => {
    onAuthStateChanged(auth, async (userData) => {
      if (!userData) {
        if (location.href.includes("admin")) {
          navigate("/login");
          return;
        }
      }

      if (userData) {
        const userID = userData.uid;
        const realtimeUserData = await get(child(ref(db), `users/${userID}`));

        setUser(realtimeUserData.val());

        if (!location.href.includes("admin")) {
          navigate("/admin");
        }
      }
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [auth]);

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
