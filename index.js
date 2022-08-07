require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const JobInfo = require("./entities/Job-Info");
const { keywords } = require("./models/job-details");

const bot = new TelegramBot(process.env.TELEGRAM_BOT_KEY, { polling: true });

bot.on("message", async (msg) => {
  if (msg.text.match(keywords)) {
    const jobInfo = new JobInfo(msg);
    const apply = await jobInfo.save();
    if (apply) {
      bot.sendMessage(
        process.env.CHAT_ID,
        `job: ${jobInfo.job} \nlink: ${jobInfo.link} \n${jobInfo.location} \ncompany: ${jobInfo.company}`
      );
    }
  }
});
bot.on("polling_error", (msg) => console.log(msg));
process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
  });
