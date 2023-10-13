import { User } from "../@types/User";

export function parseFirebaseUserData(userData: User) {
  return {
    ...userData,
    wallets: userData.wallets
      ? Object.values(userData.wallets).map((wallet) => {
          return {
            ...wallet,
            transactions: wallet.transactions
              ? Object.values(wallet.transactions)
              : [],
          };
        })
      : [],
  };
}
