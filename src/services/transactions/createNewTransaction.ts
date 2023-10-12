import { ref, set } from "firebase/database";
import { Transaction } from "../../@types/Transaction";
import { db } from "../../firebase";
import { v4 } from "uuid";

export default async function createNewTransaction(
  transaction: Transaction,
  userID: string | undefined,
  walletID: string | null,
) {
  if (!userID) {
    return;
  }

  const newTransactionID = v4();

  await set(
    ref(
      db,
      `/users/${userID}/wallets/${walletID}/transactions/${newTransactionID}`,
    ),
    {
      uid: newTransactionID,
      ...transaction,
    },
  );

  return newTransactionID;
}
