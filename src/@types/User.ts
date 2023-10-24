import { Wallet } from "./Wallet";

export interface User {
  token: string;
  uid: string;
  createdAt: string;
  email: string;
  name: string;
  profileImage: string;
  wallets: Wallet[];
}
