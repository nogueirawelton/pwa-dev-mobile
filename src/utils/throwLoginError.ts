import { toast } from "react-toastify";

const errorMap = {
  "auth/account-exists-with-different-credential":
    "Esta conta já existe com uma credencial diferente!",
};

export default function throwLoginError(error: string) {
  toast.error(errorMap[error as keyof typeof errorMap]);
}
