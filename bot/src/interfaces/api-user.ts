export enum Tariff {
  free = "free",
  pro = "pro",
}

export interface ApiUser {
  id: number;
  telegram_id: string | null;
  name: string;
  email: string;
  transactions_count: number;
  tariff: Tariff;
  created_at: Date;
  updated_at: Date;
}
