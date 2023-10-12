import { Wallet } from "./Wallet";

export interface User {
  uid: string;
  createdAt: Date;
  email: string;
  name?: string;
  profileImage?: string;
  wallets: Wallet[];
}
