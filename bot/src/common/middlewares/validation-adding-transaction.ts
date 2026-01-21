import { NextFunction } from "grammy";
import { MyContext } from "../../interfaces/my-context.js";
import { messages } from "../messages/index.js";
import { parseMatchAddingTransaction } from "../utils/index.js";

export const validationAddingTransaction = async (
  ctx: MyContext,
  next: NextFunction,
) => {
  const match = ctx.match?.toString();

  if (!match) {
    await ctx.reply(messages.invalidTransactionFormat);

    return;
  }

  const { amount, category, description } = parseMatchAddingTransaction(match);

  if (!amount || !category) {
    await ctx.reply(messages.invalidTransactionFormat);

    return;
  }

  ctx.session.amount = amount;
  ctx.session.category = category;
  ctx.session.description = description;

  next();
};
