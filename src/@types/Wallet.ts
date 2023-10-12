import { Transaction } from "./Transaction";

export interface Wallet {
  uid: string;
  name: string;
  createdAt: Date;
  balance: number;
  transactions?: Transaction[];
}
