import { ApiClient } from "../api/api.client.js";
import { messages } from "../common/messages/index.js";
import { TransactionType } from "../interfaces/api-transaction.js";
import { MyContext } from "../interfaces/my-context.js";
import { handleError } from "./handle-errror.js";

export const addTransactionHandler = async (ctx: MyContext) => {
  const { amount, category, description, accessToken } = ctx.session;

  if (!accessToken || !ctx.chat) return;

  if (!amount || !category || !ctx.message?.text) {
    await ctx.reply(messages.invalidTransactionFormat);

    return;
  }

  const type = ctx.hasCommand("expense")
    ? TransactionType.expense
    : TransactionType.income;

  const apiClient = new ApiClient(accessToken, ctx.chat.id);

  try {
    const transaction = await apiClient.createTransaction({
      amount,
      category,
      description,
      type,
    });

    let successMessage = "";

    if (type === TransactionType.expense) {
      successMessage = messages.expenseSuccess(transaction);
    } else {
      successMessage = messages.incomeSuccess(transaction);
    }

    await ctx.reply(successMessage, {
      parse_mode: "HTML",
    });
  } catch (error) {
    handleError(error as Error, ctx);
  }
};
