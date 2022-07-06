require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const JobInfo = require('./entities/Job-Info');
const { keyWords } = require('./models/key-words');
const { included } = require('./utils');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_KEY, {polling: true});



bot.on('message', (msg) => {
if(included(msg.text, keyWords)) {
const jobInfo = new JobInfo(msg);
bot.sendMessage(process.env.CHAT_ID, `job: ${jobInfo.job} \nlink: ${jobInfo.link} \n${jobInfo.location} \ncompany: ${jobInfo.company}`);
}
});

process.on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
  });
