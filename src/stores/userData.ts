import { produce } from "immer";
import { create } from "zustand";
import { User } from "../@types/User";
import { Transaction } from "../@types/Transaction";
import { persist } from "zustand/middleware";
interface UserStore {
  userData: User | null;
  currentWalletID: string | null;

  setUserData: (user: User | null) => void;

  insertNewTransaction: (walletID: string, transaction: Transaction) => void;
  deleteTransaction: (walletID: string, transactionID: string) => void;
}

export const useStore = create<UserStore>()(
  persist(
    (set) => {
      return {
        userData: null,
        currentWalletID: null,
        setUserData: (user) => {
          return set((store) =>
            produce(store, (draft) => {
              draft.userData = user;
              if (user) {
                draft.currentWalletID = user.wallets[0].uid;
              }
            }),
          );
        },
        insertNewTransaction: (walletID: string, transaction: Transaction) => {
          return set((store) =>
            produce(store, (draft) => {
              const wallet = draft.userData?.wallets.find(
                (wallet) => (wallet.uid = walletID),
              );

              if (wallet) {
                wallet.transactions?.unshift(transaction);
              }
            }),
          );
        },
        deleteTransaction: (walletID: string, transactionID: string) => {
          return set((store) =>
            produce(store, (draft) => {
              const wallet = draft.userData?.wallets.find(
                (wallet) => (wallet.uid = walletID),
              );

              if (wallet) {
                wallet.transactions = wallet.transactions.filter(
                  (transaction) => transaction.uid != transactionID,
                );
              }
            }),
          );
        },
      };
    },
    {
      name: "kpz-finances-persist", // Nome da chave no storage
      partialize: (state) => state.userData,
    },
  ),
);
