import {
  AuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
} from "firebase/auth";
import { ReactNode } from "react";
import { ComponentProps } from "react";
import throwLoginError from "../../../utils/throwLoginError";
import { auth } from "../../../firebase";
import registerUser from "../../../services/auth/registerUser";

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
          registerUser(user);
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
