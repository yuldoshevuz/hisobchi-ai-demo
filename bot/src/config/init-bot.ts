import { Bot } from "grammy";
import { logger } from "../common/logger/index.js";
import { messages } from "../common/messages/index.js";
import { MyContext } from "../interfaces/my-context.js";

export const initBot = async (bot: Bot<MyContext>) => {
  try {
    await bot.start({
      onStart: ({ username }) => {
        logger.info(messages.initBot(username));
      },
    });
  } catch (error) {
    logger.error(`Bot initialization error: ${JSON.stringify(error)}`);

    process.exit(1);
  }
};
