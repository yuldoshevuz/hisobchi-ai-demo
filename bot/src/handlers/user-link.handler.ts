import { ApiClient } from "../api/api.client.js";
import { SCENES } from "../common/enums/scenes.js";
import { messages } from "../common/messages/index.js";
import { MyContext } from "../interfaces/my-context.js";
import { handleError } from "./handle-errror.js";

export const userLinkHandler = async (ctx: MyContext) => {
  const accessToken = ctx.match as string;

  if (!ctx.from) return;

  if (!accessToken) {
    await ctx.reply(messages.invalidLinkFormat, {
      parse_mode: "HTML",
    });
    return;
  }

  const apiClient = new ApiClient(accessToken);

  const telegramId = ctx.from.id.toString();

  try {
    await apiClient.linkUser(telegramId);

    ctx.session.isLinked = true;
    ctx.session.accessToken = accessToken;

    await ctx.reply(messages.linkSuccess, {
      parse_mode: "HTML",
    });

    return ctx.scenes.enter(SCENES.MAIN, { silent: true });
  } catch (error) {
    handleError(error as Error, ctx);
  }
};
