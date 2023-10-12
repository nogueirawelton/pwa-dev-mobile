import { produce } from "immer";
import { create } from "zustand";
import { User } from "../@types/User";
import { Transaction } from "../@types/Transaction";

interface UserStore {
  userData: User | null;
  currentWalletID: string | null;

  loadUserData: (user: User) => void;
  resetUserData: () => void;

  insertNewTransaction: (walletID: string, transaction: Transaction) => void;
}

export const useUserDataStore = create<UserStore>((set) => ({
  userData: null,
  currentWalletID: null,
  loadUserData: (user: User) =>
    set((store) =>
      produce(store, (draft) => {
        draft.userData = user;
        draft.currentWalletID = user.wallets[0].uid;
      }),
    ),
  resetUserData: () =>
    set((store) =>
      produce(store, (draft) => {
        draft.userData = null;
      }),
    ),
  insertNewTransaction: (walletID: string, transaction: Transaction) =>
    set((store) =>
      produce(store, (draft) => {
        const wallet = draft.userData?.wallets.find(
          (wallet) => (wallet.uid = walletID),
        );

        if (wallet) {
          wallet.transactions?.push(transaction);
        }
      }),
    ),
}));
