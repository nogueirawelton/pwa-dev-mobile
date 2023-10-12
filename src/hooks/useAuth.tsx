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
import { useUserDataStore } from "../stores/userData";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContext {
  user: User | null;
}

const AuthContext = createContext({});

export function AuthContextProvider({ children }: AuthContextProps) {
  const [isLoading, setIsLoading] = useState(true);
  const loadUserData = useUserDataStore((state) => state.loadUserData);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (!userData) {
        if (location.href.includes("admin")) {
          navigate("/login");
          return;
        }
      }

      if (userData) {
        const userID = userData.uid;

        get(child(ref(db), `users/${userID}`)).then((realtimeUserData) => {
          const parsedData: User = realtimeUserData.val();

          loadUserData({
            ...parsedData,
            wallets: parsedData.wallets
              ? Object.values(parsedData.wallets).map((wallet) => {
                  return {
                    ...wallet,
                    transactions: wallet.transactions
                      ? Object.values(wallet.transactions)
                      : [],
                  };
                })
              : [],
          });
        });

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

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
