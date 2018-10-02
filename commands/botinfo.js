const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log("botinfo.js is running");
});

bot.on("message", async message => {

if(message.author.bot) return;
if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    let cmd = messageArray[0];

    if(cmd === `${prefix}botinfo`){

        let infoEmbed = new Discord.RichEmbed()
        .setTitle("*Bot Info*")
        .setColor("#35ff71")
        .addField("Date Created", bot.user.createdAt)
        .addField("Created By", "KaiWhen#9072")
        
        message.channel.send(infoEmbed);
    }



});

bot.login(botconfig.token);
