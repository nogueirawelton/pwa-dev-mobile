import { Categories } from "./Categories";
import { TransactionTypes } from "./TransactionTypes";

export interface Transaction {
  uid: string;
  name: string;
  type: TransactionTypes;
  category: Categories;
  transactionDate: string;
  createdAt: string;
  deletedAt: string;
  amount: string;
  isSchedule: boolean;
}
