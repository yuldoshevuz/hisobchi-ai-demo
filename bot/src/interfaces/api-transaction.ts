export enum TransactionType {
  income = "income",
  expense = "expense",
}

export interface ApiTransaction {
  id: number;
  user_id: number;
  telegram_id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string | null;
  date: Date;
  created_at: Date;
}
