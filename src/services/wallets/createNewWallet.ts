import { Wallet } from "../../@types/Wallet";
import { ref, set } from "firebase/database";
import { db } from "../../firebase";

export async function createNewWallet(wallet: Wallet, userID: string) {
  return await set(ref(db, `users/${userID}/wallets/${wallet.uid}`), wallet);
}
