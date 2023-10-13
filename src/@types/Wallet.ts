import { Transaction } from "./Transaction";

export interface Wallet {
  uid: string;
  name: string;
  createdAt: string;
  balance: number;
  transactions: Transaction[];
}
