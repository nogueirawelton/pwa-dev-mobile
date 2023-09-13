import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { OAuthButton } from '../components/OAuthButton';

export function Login() {
  return (
    <div>
      <OAuthButton provider={new GoogleAuthProvider()}>
        Logar com o Google
      </OAuthButton>
      <OAuthButton provider={new GithubAuthProvider()}>
        Logar com o Github
      </OAuthButton>
    </div>
  );
}
