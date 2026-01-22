import { ApiClient } from "src/api/api.client.js";
import { messages } from "src/common/messages/index.js";
import { ApiGetSummaryQuery } from "src/interfaces/api-get-summary-query.js";
import { Tariff } from "src/interfaces/api-user.js";
import { MyContext } from "src/interfaces/my-context.js";
import { handleError } from "./handle-errror.js";

export const summaryHandler = async (ctx: MyContext) => {
  const { user, accessToken } = ctx.session;

  if (!accessToken || !ctx.chat) return;

  const match = ctx.match as string;

  const query: ApiGetSummaryQuery = {};

  if (match) {
    const [fromStr, toStr] = match.split(" ");

    const from = new Date(fromStr);
    const to = new Date(toStr);

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      await ctx.reply(messages.invalidDateRange);

      return;
    }

    if (from > to) {
      await ctx.reply(messages.invalidDateRange);

      return;
    }

    if (user.tariff === Tariff.free && match) {
      await ctx.reply(messages.onlyProForSummary);

      return;
    }

    query.from = fromStr;
    query.to = toStr;
  }

  const apiClient = new ApiClient(accessToken, ctx.chat.id);

  try {
    const summary = await apiClient.getSummary(query);

    await ctx.reply(messages.summary(summary));
  } catch (error) {
    handleError(error as Error, ctx);
  }
};
