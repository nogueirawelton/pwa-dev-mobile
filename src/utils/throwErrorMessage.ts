import { toast } from "react-toastify";

export function throwErrorMessage(message: string) {
  toast.error(message);
}
