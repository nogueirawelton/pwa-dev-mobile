import { AuthProvider } from "firebase/auth";
import { ReactNode } from "react";
import { ComponentProps } from "react";
import { throwLoginError } from "../../../utils/throwLoginError";
import { useNavigate } from "react-router-dom";
import { loginWithOAuth } from "../../../services/auth/loginWithOAuth";

interface OAuthButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  provider: AuthProvider;
}

export function OAuthButton({
  children,
  provider,
  ...props
}: OAuthButtonProps) {
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      await loginWithOAuth(provider);
      navigate("/admin");
    } catch ({ code }: any) {
      throwLoginError(code);
    }
  }

  return (
    <button onClick={handleLogin} {...props}>
      {children}
    </button>
  );
}
