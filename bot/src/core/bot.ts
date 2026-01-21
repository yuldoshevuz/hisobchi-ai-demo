import { Bot } from "grammy";
import { BOT_TOKEN } from "../common/environments/index.js";
import { MyContext } from "../interfaces/my-context.js";

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN is not defined");
}

export const bot = new Bot<MyContext>(BOT_TOKEN);
