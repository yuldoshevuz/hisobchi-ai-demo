import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "../common/environments/index.js";
import { ApiCreateTransaction } from "../interfaces/api-create-transaction.js";
import { ApiGetSummaryQuery } from "../interfaces/api-get-summary-query.js";
import { ApiTransaction } from "../interfaces/api-transaction.js";
import { ApiSummary } from "../interfaces/api-summary.js";
import { ApiUser } from "../interfaces/api-user.js";

export class ApiClient {
  private readonly client: AxiosInstance;

  constructor(apiKey: string, telegramId: number) {
    this.client = axios.create({
      baseURL: `${API_BASE_URL}/api`,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "X-Telegram-Id": telegramId,
      },
    });
  }

  async linkUser(telegramId: string): Promise<ApiUser> {
    const result = await this.client.post<ApiUser>("/user/link", {
      telegram_id: telegramId,
    });

    return result.data;
  }

  async unlinkUser(): Promise<ApiUser> {
    const result = await this.client.post<ApiUser>("/user/unlink");

    return result.data;
  }

  async createTransaction(data: ApiCreateTransaction): Promise<ApiTransaction> {
    const result = await this.client.post<ApiTransaction>("/transaction", data);

    return result.data;
  }

  async getSummary(query: ApiGetSummaryQuery): Promise<ApiSummary> {
    const result = await this.client.get<ApiSummary>("/transaction/summary", {
      params: query,
    });

    result.data.from = new Date(result.data.from);
    result.data.to = new Date(result.data.to);

    return result.data;
  }

  async getUserMe(): Promise<ApiUser> {
    const result = await this.client.get<ApiUser>("/user/me");

    return result.data;
  }
}
