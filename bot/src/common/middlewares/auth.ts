import { NextFunction } from "grammy";
import { MyContext } from "../../interfaces/my-context.js";
import { messages } from "../messages/index.js";
import { ApiClient } from "../../api/api.client.js";
import { handleError } from "../../handlers/handle-errror.js";

export const auth = async (ctx: MyContext, next: NextFunction) => {
  try {
    const { isLinked, accessToken } = ctx.session;

    if (!isLinked || !accessToken) {
      await ctx.reply(messages.startBeforeLinking, {
        parse_mode: "HTML",
      });

      return;
    }

    const apiClient = new ApiClient(accessToken);

    const user = await apiClient.getUserMe();

    ctx.session.isLinked = true;
    ctx.session.accessToken = accessToken;
    ctx.session.user = user;

    next();
  } catch (error) {
    handleError(error as Error, ctx);
  }
};
