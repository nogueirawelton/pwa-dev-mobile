import { produce } from "immer";
import { create } from "zustand";
import { User } from "../@types/User";
import { Transaction } from "../@types/Transaction";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";
import { openDB } from "idb";

interface UserStore {
  userData: User | null;
  currentWalletID: string | null;

  setUserData: (user: User | null) => void;

  insertNewTransaction: (walletID: string, transaction: Transaction) => void;
  deleteTransaction: (walletID: string, transactionID: string) => void;
}

export const hybridStorageAdapter = () => {
  const dbPromise = openDB("kpz-finances-persist", 1, {
    upgrade(db) {
      db.createObjectStore("kpz-finances-persist");
    },
  });

  return {
    getItem: async (key: string) => {
      const db = await dbPromise;
      const data: Promise<string> = db.get(key, key);
      return data;
    },
    setItem: async (key: string, value: string) => {
      localStorage.setItem(key, JSON.stringify(value));
      dbPromise.then((db) => db.put(key, value, key));
    },
    removeItem: async (key: string) => {
      localStorage.removeItem(key);
      dbPromise.then((db) => db.delete(key, key));
    },
  } as StateStorage;
};

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
      storage: createJSONStorage(() => hybridStorageAdapter()),
    },
  ),
);
