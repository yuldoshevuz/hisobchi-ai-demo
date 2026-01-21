import { session } from "grammy";
import { bot } from "./core/bot.js";
import { scenes } from "./scenes/index.js";
import { userLinkHandler } from "./handlers/user-link.handler.js";
import { auth } from "./common/middlewares/auth.js";
import { SCENES } from "./common/enums/scenes.js";
import { initBot } from "./config/init-bot.js";

bot.use(session({ initial: () => ({}) }));
bot.use(scenes.manager());
bot.use(scenes);

bot.command("link", userLinkHandler);

bot.use(auth);

bot.command("start", (ctx) => ctx.scenes.enter(SCENES.MAIN));

initBot(bot);
