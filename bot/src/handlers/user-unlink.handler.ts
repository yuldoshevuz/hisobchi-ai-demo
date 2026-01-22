import { ApiClient } from "../api/api.client.js";
import { messages } from "../common/messages/index.js";
import { handleError } from "./handle-errror.js";
import { MyContext } from "../interfaces/my-context.js";

export const userUnlinkHandler = async (ctx: MyContext) => {
  if (!ctx.chat) return;

  const isLinked = ctx.session.isLinked;
  const accessToken = ctx.session.accessToken;

  if (!isLinked || !accessToken) {
    await ctx.reply(messages.alreadyUnlinked);
    return;
  }

  const apiClient = new ApiClient(accessToken, ctx.chat.id);

  try {
    await apiClient.unlinkUser();

    await ctx.reply(messages.unlinkSuccess);
  } catch (error) {
    handleError(error as Error, ctx);
  } finally {
    ctx.session.isLinked = false;
    ctx.session.accessToken = "";
  }
};
