import { ApiClient } from "src/api/api.client.js";
import { messages } from "src/common/messages/index.js";
import { MyContext } from "src/interfaces/my-context.js";
import { handleError } from "./handle-errror.js";

export const weeklySummaryHandler = async (ctx: MyContext) => {
  const { accessToken } = ctx.session;

  if (!accessToken) return;

  const from = new Date();
  const to = new Date();

  from.setDate(from.getDate() - 7);

  const apiClient = new ApiClient(accessToken);

  const fromStr = from.toISOString();
  const toStr = to.toISOString();

  try {
    const summary = await apiClient.getSummary({
      from: fromStr,
      to: toStr,
    });

    await ctx.reply(messages.summary(summary));
  } catch (error) {
    handleError(error as Error, ctx);
  }
};
