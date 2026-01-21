import { TransactionType } from "./api-transaction.js";

export interface ApiCreateTransaction {
  type: TransactionType;
  amount: number;
  category: string;
  description?: string;
}
