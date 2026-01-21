import { NextFunction } from "grammy";
import { Tariff } from "../../interfaces/api-user.js";
import { MyContext } from "../../interfaces/my-context.js";
import { messages } from "../messages/index.js";

export const onlyProUser = async (ctx: MyContext, next: NextFunction) => {
  const { user } = ctx.session;

  if (user.tariff === Tariff.free) {
    await ctx.reply(messages.onlyProForSummary);

    return;
  }

  next();
};
