import {
  AuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import { registerUserOnDatabase } from "./registerUser";

export async function loginWithOAuth(provider: AuthProvider) {
  auth.useDeviceLanguage();

  const loginData = await signInWithPopup(auth, provider);

  const { isNewUser } = getAdditionalUserInfo(loginData)!;
  const { user } = loginData;

  if (isNewUser) {
    registerUserOnDatabase(user);
  }

  return user;
}
