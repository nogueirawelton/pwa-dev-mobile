import { toast } from "react-toastify";

export function throwSuccessMessage(message: string) {
  toast.success(message);
}
