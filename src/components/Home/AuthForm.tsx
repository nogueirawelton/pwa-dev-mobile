import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { OAuthButton } from "./OAuthButton";
import { GithubLogo, GoogleLogo } from "phosphor-react";

export function AuthForm() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[300px] space-y-2">
        <OAuthButton
          className="flex w-full items-center justify-center gap-4 rounded-md border border-zinc-700 px-5 py-3 text-zinc-100 transition-colors duration-300 hover:bg-zinc-700"
          provider={new GoogleAuthProvider()}
        >
          <GoogleLogo className="h-5 w-5" weight="bold" />
          Continuar com o Google
        </OAuthButton>
        <OAuthButton
          className="flex w-full items-center justify-center gap-4 rounded-md border border-zinc-700 px-5 py-3 text-zinc-100 transition-colors duration-300 hover:bg-zinc-700"
          provider={new GithubAuthProvider()}
        >
          <GithubLogo className="h-5 w-5" weight="bold" />
          Continuar com o Github
        </OAuthButton>
      </div>
    </div>
  );
}
