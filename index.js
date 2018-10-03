const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({disableEveryone: true});
const rps = require("./commands/rps.js");
const botinfo = require("./commands/botinfo.js");
const quickmaths = require("./commands/quickmaths.js");

bot.on("ready", async () => {
    console.log(`${bot.user.username} is running`);
    bot.user.setActivity("with u");
  });


var rnd;
var sayRnd = new Array();

sayRnd[0] = "fuk u";
sayRnd[1] = "Hello!";
sayRnd[2] = "u suck";
sayRnd[3] = "How are you?";
sayRnd[4] = "something";
sayRnd[5] = "YEET";
sayRnd[6] = "YEET DAB";
sayRnd[7] = "Merry Christmas!";
sayRnd[8] = "you are stupid :)";



bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.author.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}talk`){
    
        rnd = Math.floor(Math.random()*9)
        return message.channel.send(sayRnd[rnd]);

    }

});




bot.login(botconfig.token);

//https://discordapp.com/oauth2/authorize?client_id=496756423901052931&scope=bot
