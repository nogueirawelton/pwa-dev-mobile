import { AuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ComponentProps } from "react";
import throwLoginError from "../../utils/throwLoginError";

interface OAuthButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  provider: AuthProvider;
}

export function OAuthButton({
  children,
  provider,
  ...props
}: OAuthButtonProps) {
  const auth = getAuth();
  const navigate = useNavigate();

  function handleLogin() {
    auth.useDeviceLanguage();

    signInWithPopup(auth, provider)
      .then(() => {
        navigate("/admin");
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
