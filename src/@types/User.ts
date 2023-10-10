import { Wallet } from "./Wallet";

export interface User {
  createdAt: Date;
  email: string;
  name?: string;
  profileImage?: string;
  wallets: Wallet[];
}
