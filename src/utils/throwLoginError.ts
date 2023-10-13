import { toast } from "react-toastify";

const errorMap = {
  "auth/account-exists-with-different-credential":
    "Esta conta já existe com uma credencial diferente!",
  "auth/email-already-in-use": "Já existe uma conta com este email!",
  "auth/invalid-login-credentials": "Email ou senha inválidos!",
  "auth/waiting-email-verification": "Email não verificado! ",
};

export function throwLoginError(error: string) {
  toast.error(
    errorMap[error as keyof typeof errorMap] || "Ocorreu um erro desconhecido!",
  );
}
