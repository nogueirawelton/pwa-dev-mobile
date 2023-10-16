import { AuthProvider } from "firebase/auth";
import { ReactNode } from "react";
import { ComponentProps } from "react";
import { throwLoginError } from "../../../utils/throwLoginError";
import { useNavigate } from "react-router-dom";
import { loginWithOAuth } from "../../../services/auth/loginWithOAuth";
import { registerCredential } from "../../../services/auth/registerCredential";

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
      const user = await loginWithOAuth(provider);
      await registerCredential(user);
      navigate("/admin");
    } catch (error: any) {
      console.log(error);
      throwLoginError(error.code);
    }
  }

  return (
    <button onClick={handleLogin} {...props}>
      {children}
    </button>
  );
}
