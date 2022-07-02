const TelegramBot = require('node-telegram-bot-api');
const JobInfo = require('./entities/JobInfo');
const token = '5519820453:AAGYgae5r_pSIvHw3-TppIO0OF21bFY4iRE';

const bot = new TelegramBot(token, {polling: true});
const chatId = "-721901979";

const keyWords = ["Full Stack","Fullstack", "Front End", "Frontend", "Back end", "backend"];



const included = (text, keyWords) =>{
    for(const w of keyWords){
        if (text.search(w) !== -1) {
            return true;
        }
    }
    return false;
}

bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
if(included(msg.text, keyWords)) {
const jobInfo = new JobInfo(msg);
console.log('jobInfo class instance:', jobInfo);
bot.sendMessage(chatId, `job: ${jobInfo.job} \nlink: ${jobInfo.link}`);
}

    console.log('msg:', msg);

  
});

process.on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
  });


// msg: {
//     message_id: 20,
//     from: {
//       id: 325043125,
//       is_bot: false,
//       first_name: 'ש',
//       last_name: 'ב',
//       language_code: 'he'
//     },
//     chat: {
//       id: -721901979,
//       title: 'Job tests',
//       type: 'group',
//       all_members_are_administrators: true
//     },
//     date: 1656764203,
//     text: 'Junior System Analyst at Sisense\n' +
//       'Location: Tel Aviv\n' +
//       'Press here to apply\n' +
//       '#JuniorPositions',
//     entities: [ { offset: 72, length: 16, type: 'hashtag' } ]
//   }