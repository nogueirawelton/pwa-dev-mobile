import { produce } from "immer";
import { create } from "zustand";
import { User } from "../@types/User";

interface UserStore {
  userData: User | null;
  loadUserData: (user: User) => void;
}

export const useUserDataStore = create<UserStore>((set) => ({
  userData: null,
  loadUserData: (user: User) =>
    set((store) =>
      produce(store, (draft) => {
        draft.userData = user;
      }),
    ),
}));
