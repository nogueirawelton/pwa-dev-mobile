import { ref, update } from "firebase/database";
import { db } from "../../firebase";

export async function deleteTransactionById(
  userID: string,
  walletID: string,
  transactionID: string,
) {
  await update(
    ref(
      db,
      `/users/${userID}/wallets/${walletID}/transactions/${transactionID}`,
    ),
    {
      deletedAt: new Date().toString(),
    },
  );
}
