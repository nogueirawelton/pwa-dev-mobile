import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { GithubLogo, GoogleLogo } from "phosphor-react";

import { Title } from "./Title";
import { Form } from "./Form";
import { AuxText } from "./AuxText";
import { OptionDivider } from "./OptionDivider";
import { OAuthButton } from "./OAuthButton";
import { useEffect } from "react";
import { useStore } from "../../../stores/userData";
import { getExistentCredential } from "../../../services/auth/registerCredential";
import { useNavigate } from "react-router-dom";

export function Auth() {
  const isLogin = location.href.includes("login");

  const navigate = useNavigate();

  const userData = useStore((state) => state.userData);
  const setUserData = useStore((state) => state.setUserData);

  useEffect(() => {
    async function mount() {
      if (userData) {
        const credentialData = await getExistentCredential(userData.uid);

        navigator.credentials
          .get({
            publicKey: {
              allowCredentials: [
                {
                  id: credentialData.credential,
                  type: "public-key",
                  transports: ["internal"],
                },
              ],
              challenge: new Uint8Array(32),
              timeout: 60000,
            },
          })
          .then(() => {
            navigate("/admin");
          })
          .catch(() => {
            setUserData(null);
          });
      }
    }

     if (!window.matchMedia("(display-mode: standalone)").matches && navigator.onLine) {
       return;
     }

    mount();
  }, []);

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
