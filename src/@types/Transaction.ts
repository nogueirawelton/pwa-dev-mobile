import { Categories } from "./Categories";
import { TransactionTypes } from "./TransactionTypes";

export interface Transaction {
  uid: string;
  name: string;
  type: TransactionTypes;
  category: Categories;
  date: string;
  amount: string;
}
