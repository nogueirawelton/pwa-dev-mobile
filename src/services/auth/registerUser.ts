import { User } from "firebase/auth";
import { ref, set } from "firebase/database";
import { db } from "../../firebase";
import { v4 } from "uuid";

export default function registerUser(user: User) {
  set(ref(db, `users/${user.uid}`), {
    name: "",
    email: user.email,
    profileImage: "",
    createdAt: user.metadata.creationTime,
    wallets: [
      {
        uid: v4(),
        name: "Finanças",
        balance: 0,
        createdAt: user.metadata.creationTime,
      },
    ],
  });
}
