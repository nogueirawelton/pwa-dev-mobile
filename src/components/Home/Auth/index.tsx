import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { GithubLogo, GoogleLogo } from "phosphor-react";

import { Title } from "./Title";
import { Form } from "./Form";
import { AuxText } from "./AuxText";
import { OptionDivider } from "./OptionDivider";
import { OAuthButton } from "./OAuthButton";

export function Auth() {
  const isLogin = location.href.includes("login");

  return (
    <div className="flex flex-col items-center">
      <Title isLogin={isLogin} />
      <div className="w-full max-w-[320px] space-y-2">
        <Form isLogin={isLogin} />
        <AuxText isLogin={isLogin} />
        <OptionDivider />
        <div className="space-y-2">
          <OAuthButton
            className="flex h-12 w-full items-center justify-center gap-4 rounded-md border border-zinc-700 px-5 text-zinc-100 transition-colors duration-300 hover:bg-zinc-700"
            provider={new GoogleAuthProvider()}
          >
            <GoogleLogo className="h-5 w-5" weight="bold" />
            Continuar com o Google
          </OAuthButton>
          <OAuthButton
            className="flex h-12 w-full items-center justify-center gap-4 rounded-md border border-zinc-700 px-5 text-zinc-100 transition-colors duration-300 hover:bg-zinc-700"
            provider={new GithubAuthProvider()}
          >
            <GithubLogo className="h-5 w-5" weight="bold" />
            Continuar com o Github
          </OAuthButton>
        </div>
      </div>
    </div>
  );
}
