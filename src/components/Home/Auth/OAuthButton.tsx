import {
  AuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
} from "firebase/auth";
import { ReactNode } from "react";
import { ComponentProps } from "react";
import throwLoginError from "../../../utils/throwLoginError";
import { ref, set } from "firebase/database";
import { auth, db } from "../../../services/firebase";
import { v4 } from "uuid";

interface OAuthButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  provider: AuthProvider;
}

export function OAuthButton({
  children,
  provider,
  ...props
}: OAuthButtonProps) {
  function handleLogin() {
    auth.useDeviceLanguage();

    signInWithPopup(auth, provider)
      .then((loginData) => {
        const { isNewUser } = getAdditionalUserInfo(loginData)!;
        const { user } = loginData;

        if (isNewUser) {
          set(ref(db, `users/${user.uid}`), {
            name: user.displayName,
            email: user.email,
            profileImage: user.photoURL,
            createdAt: user.metadata.creationTime,
            wallets: [
              {
                uid: v4(),
                name: "Finanças",
                balance: 0,
                createdAt: user.metadata.creationTime,
              },
            ],
          });
        }
      })
      .catch(({ code }) => {
        throwLoginError(code);
      });
  }

  return (
    <button onClick={handleLogin} {...props}>
      {children}
    </button>
  );
}
