import { NextFunction } from "grammy";
import { MyContext } from "src/interfaces/my-context.js";

export const privateChatOnly = (ctx: MyContext, next: NextFunction) => {
  if (!ctx.chat || ctx.chat.type !== "private") {
    return;
  }

  next();
};
