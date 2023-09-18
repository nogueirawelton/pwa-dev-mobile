import { toast } from "react-toastify";

export default function throwSuccessMessage(message: string) {
  toast.success(message);
}
