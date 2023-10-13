import { ref, set } from "firebase/database";
import { Transaction } from "../../@types/Transaction";
import { db } from "../../firebase";

export default async function createNewTransaction(
  transaction: Transaction,
  userID: string | undefined,
  walletID: string | null,
) {
  if (!userID) {
    return;
  }

  await set(
    ref(
      db,
      `/users/${userID}/wallets/${walletID}/transactions/${transaction.uid}`,
    ),
    transaction,
  );
}
