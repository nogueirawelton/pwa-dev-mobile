import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export async function loginWithEmailAndPassword(
  email: string,
  password: string,
) {
  await signInWithEmailAndPassword(auth, email, password);
}
