import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { child, get, ref } from "firebase/database";
import { User } from "../@types/User";
import { useUserDataStore } from "../stores/userData";
import parseFirebaseUserData from "../utils/parseFirebaseUserData";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContext {
  user: User | null;
}

const AuthContext = createContext({});

export function AuthContextProvider({ children }: AuthContextProps) {
  const loadUserData = useUserDataStore((state) => state.loadUserData);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (signedUser) => {
      if (!signedUser) {
        if (location.href.includes("admin")) {
          navigate("/login");
          return;
        }
      }

      if (signedUser) {
        const userID = signedUser.uid;

        get(child(ref(db), `users/${userID}`)).then(
          (realtimeSignedUserData) => {
            const userData: User = realtimeSignedUserData.val();
            const parsedUserData = parseFirebaseUserData(userData);

            loadUserData(parsedUserData);

            if (!location.href.includes("admin")) {
              navigate("/admin");
            }
          },
        );
      }
    });
  }, [auth]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
