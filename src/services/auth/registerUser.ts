import { User } from "firebase/auth";
import { ref, set } from "firebase/database";
import { db } from "../../firebase";
import { v4 } from "uuid";

export default function registerUser(user: User) {
  const defaultWalletID = v4();

  set(ref(db, `users/${user.uid}`), {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    profileImage: user.photoURL,
    createdAt: user.metadata.creationTime,
  }).then(() => {
    set(ref(db, `users/${user.uid}/wallets/${defaultWalletID}`), {
      uid: defaultWalletID,
      name: "Finanças",
      balance: 0,
      createdAt: user.metadata.creationTime,
    });
  });
}
