import { GrammyError } from "grammy";
import { AxiosError } from "axios";
import { MyContext } from "../interfaces/my-context.js";
import { bot } from "../core/bot.js";
import { htmlFormatter } from "../common/utils/index.js";
import { BOT_TOKEN, ERROR_CHANNELID } from "../common/environments/index.js";
import { logger } from "../common/logger/index.js";
import { messages } from "../common/messages/index.js";
import { SCENES } from "../common/enums/scenes.js";

export const handleError = async (
  error: Error | GrammyError | AxiosError,
  ctx: MyContext,
) => {
  const formattedDate = new Date().toLocaleDateString("uz");
  const formattedTime = new Date().toLocaleTimeString("uz");

  const errorMessage =
    `` +
    `🚨 <b>UNEXPECTED ERROR FROM @${bot.botInfo.username}</b>

📅 <b>Date:</b> ${formattedDate}
⏰ <b>Time:</b> ${formattedTime}

❌ <b>Error Details:</b>
• <b>Message:</b> <pre><code class="language-bash">${htmlFormatter(
      error.message,
    )}</code></pre>
• <b>Type:</b> <pre><code class="language-bash">${error.name}</code></pre>

👤 <b>User Data:</b>
${
  ctx.session.user
    ? `<pre><code class="language-json">${JSON.stringify(
        ctx.session.user,
        null,
        2,
      )}</code></pre>`
    : "<i>No user data available</i>"
}

👥 <b>Chat Data:</b>
${
  ctx.chat
    ? `<pre><code class="language-json">${JSON.stringify(
        ctx.chat,
        null,
        2,
      )}</code></pre>`
    : "<i>No chat data available</i>"
}

📝 <b>Message:</b>
${
  ctx.message
    ? `<pre><code class="language-json">${JSON.stringify(
        ctx.message,
        null,
        2,
      )}</code></pre>`
    : "<i>No message data available</i>"
}

🎛 <b>Callback Query:</b>
${
  ctx.callbackQuery
    ? `<pre><code class="language-json">${JSON.stringify(
        ctx.callbackQuery.data,
        null,
        2,
      )}</code></pre>`
    : "<i>No callback query data available</i>"
}

🔄 <b>Reply:</b>
${
  ctx.reply
    ? `<pre><code class="language-json">${JSON.stringify(
        ctx.reply,
        null,
        2,
      )}</code></pre>`
    : "<i>No reply data available</i>"
}

🔄 <b>Session Data:</b>
<pre><code class="language-json">${JSON.stringify(
      ctx.session,
      null,
      2,
    )}</code></pre>

⚡️ <i>Error has been automatically logged</i>`;

  // Send error to Telegram if bot token exists
  if (BOT_TOKEN && ERROR_CHANNELID) {
    try {
      await bot.api.sendMessage(ERROR_CHANNELID, errorMessage, {
        parse_mode: "HTML",
      });
    } catch (sendError: any) {
      await bot.api.sendMessage(
        ERROR_CHANNELID,
        `<b>Error sending error to Telegram:</b>\n<pre><code class="language-bash">${sendError}</code></pre>`,
        { parse_mode: "HTML" },
      );
      logger.error("Error sending error to Telegram:", sendError);
    }
  }

  if (error instanceof AxiosError) {
    const statusCode = error.response?.status;

    if (statusCode === 401) {
      await ctx.reply(messages.invalidAccessToken, {
        parse_mode: "HTML",
      });

      ctx.session.isLinked = false;
      ctx.session.accessToken = "";

      return;
    }

    if (statusCode === 402) {
      await ctx.reply(messages.upgradeTariff, {
        parse_mode: "HTML",
      });

      return;
    }

    if (statusCode === 403) {
      await ctx.reply(messages.alreadyLinked, {
        parse_mode: "HTML",
      });

      return;
    }

    await ctx.reply(messages.serverError);

    return;
  }

  await ctx.reply(messages.globalError);

  // Log error to logger
  logger.error(`Error: ${JSON.stringify(error)}`);
  return ctx.scenes.enter(SCENES.MAIN, { silent: true });
};
