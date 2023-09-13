import { AuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComponentProps } from 'react';
import { toast } from 'react-toastify';

interface OAuthButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
  provider: AuthProvider;
}

const errorMap = {
  'auth/account-exists-with-different-credential':
    'Esta conta já existe com uma credencial diferente!',
};

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
        navigate('/admin/dashboard');
      })
      .catch((error) => {
        console.log(error.code);
        toast.error(errorMap[error.code as keyof typeof errorMap]);
      });
  }

  return (
    <button
      onClick={handleLogin}
      {...props}>
      {children}
    </button>
  );
}
