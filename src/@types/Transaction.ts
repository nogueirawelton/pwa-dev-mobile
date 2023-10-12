import { Categories } from "./Categories";
import { TransactionTypes } from "./TransactionTypes";

export interface Transaction {
  name: string;
  type: TransactionTypes;
  description: string;
  category: Categories;
  date: string;
}
