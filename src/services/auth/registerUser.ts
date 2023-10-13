import { User, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../../firebase";
import { v4 } from "uuid";
import { createNewWallet } from "../wallets/createNewWallet";

export async function registerUserOnDatabase(user: User) {
  set(ref(db, `users/${user.uid}`), {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    profileImage: user.photoURL,
    createdAt: new Date().toString(),
  });

  await createNewWallet(
    {
      uid: v4(),
      name: "Finanças",
      balance: 0,
      createdAt: new Date().toString(),
      transactions: [],
    },
    user.uid,
  );
}

export async function createAccount(email: string, password: string) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  return await registerUserOnDatabase(user);
}
