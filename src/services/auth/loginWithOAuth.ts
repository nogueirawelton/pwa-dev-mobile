import {
  AuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import { registerUserOnDatabase } from "./registerUser";

export async function loginWithOAuth(provider: AuthProvider) {
  auth.useDeviceLanguage();

  return await signInWithPopup(auth, provider).then((loginData) => {
    const { isNewUser } = getAdditionalUserInfo(loginData)!;
    const { user } = loginData;

    if (isNewUser) {
      registerUserOnDatabase(user);
    }
  });
}
