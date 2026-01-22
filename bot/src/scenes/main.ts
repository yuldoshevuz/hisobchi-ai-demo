import { Scene } from "grammy-scenes";
import { MyContext } from "../interfaces/my-context.js";
import { SCENES } from "../common/enums/scenes.js";
import { messages } from "../common/messages/index.js";
import { validationAddingTransaction } from "../common/middlewares/validation-adding-transaction.js";
import { auth } from "../common/middlewares/auth.js";
import { userLinkHandler } from "../handlers/user-link.handler.js";
import { addTransactionHandler } from "../handlers/add-transaction.handler.js";
import { onlyProUser } from "../common/middlewares/only-pro-user.js";
import { summaryHandler } from "src/handlers/summary-handler.js";
import { weeklySummaryHandler } from "src/handlers/weekly-summary.handler.js";
import { dailySummaryHandler } from "src/handlers/daily-summary.handler.js";
import { userUnlinkHandler } from "src/handlers/user-unlink.handler.js";

export const mainScene = new Scene<MyContext>(SCENES.MAIN);

mainScene.step(async (ctx) => {
  if (ctx.scene.arg?.silent) return;

  await ctx.reply(messages.startAfterLinking);
});

mainScene.wait("command").setup((scene) => {
  scene.command("link", userLinkHandler);

  scene.use(auth);

  scene.command("start", (ctx) => ctx.scene.enter(SCENES.MAIN));

  scene.command("unlink", userUnlinkHandler);

  scene.command(
    ["expense", "income"],
    validationAddingTransaction,
    addTransactionHandler,
  );

  scene.command("summary", summaryHandler);

  scene.command("week", onlyProUser, weeklySummaryHandler);

  scene.command("day", onlyProUser, dailySummaryHandler);
});
