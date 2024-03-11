import { Telegraf } from 'telegraf';
import { config } from 'dotenv';

config();

const bot = new Telegraf(process.env.TOKEN);

bot.on('message', async (ctx) => {
  const { message } = ctx;
  const isPdfAttached = message.document && message.document.mime_type === 'application/pdf';
  const isCommentOnChannelPost = !!message.reply_to_message;
  const isAutomaticForwardFromChannel = message.is_automatic_forward && message.sender_chat?.type === 'channel';

  if ((isPdfAttached && isCommentOnChannelPost) || isAutomaticForwardFromChannel) {
    return;
  }
  await ctx.deleteMessage();
});

export default bot;
