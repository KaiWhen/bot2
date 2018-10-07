const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({disableEveryone: true});
const rps = require("./rps.js");
const botinfo = require("./botinfo.js");
const fs = require("fs");
const moment = require("moment");
bot.commands = new Discord.Collection();
const mongoose = require('mongoose');
const Money = require("./models/moneys.js");
const Schema = mongoose.Schema;
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB);
//mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function load(dir){

    fs.readdir(dir, (err, files) => {

    if(err) console.log(err);
    
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Could not find commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        delete require.cache[require.resolve(`${dir}${f}`)];
        let props = require(`${dir}${f}`);
        console.log(`${f} loaded yay!`);
        bot.commands.set(props.help.name, props);
    });
});
}

load("./commands/fun/");
load("./commands/moderation/");
load("./commands/economy/");

bot.on("ready", async () => {
    console.log(`${bot.user.username} is running`);
    bot.user.setActivity("with u");
  });


bot.on("message", async message => {

    
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let prefix = botconfig.prefix;
    let args = messageArray.slice(1);
    

    if(message.content.startsWith(prefix)){
        let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if(commandfile) commandfile.run(bot, message, args);
    }else{
        Money.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, (err, money) => {
            if(err) console.log(err);
            if(!money){
                const newMoney = new Money({
                    _id: mongoose.Types.ObjectId(),
                    userID: message.author.id,
                    username: message.author.username,
                    serverID: message.guild.id,
                    money: 500,
                    prevDaily: false
                })
                newMoney.save()
                .then(result => console.log(result))
                .catch(err => console.log(err));
            }else{
                
                money.money = money.money;
                money.save()
                .then(result => console.log(result))
                .catch(err => console.log(err));
            }
            
        });
    }

});




bot.login(process.env.BOT_TOKEN);

//https://discordapp.com/oauth2/authorize?client_id=496756423901052931&scope=bot
