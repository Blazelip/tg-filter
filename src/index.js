import { TelegramError } from 'telegraf';
import bot from './bot.js';

process
  .on('unhandledRejection', (reason, _p) => {
    console.log(`Unhandled Rejection at Promise: ${reason}`);
    bot.stop();
    process.exit(1);
  })
  .on('uncaughtException', (error) => {
    console.log(`Uncaught Exception thrown: ${error}`);
    bot.stop();
    process.exit(1);
  });

const startBot = async () => {
  try {
    console.log('Bot is starting!');
    await bot.launch();
  } catch (error) {
    if (error instanceof TelegramError) {
      console.log(`Unexpected Telegram Error ${error}`);
    } else {
      throw error;
    }
  }
};

startBot();
