const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    
    if(message.content.includes("x")) return message.reply("Please use '*' instead of 'x' for multiplication");
    //if(args[1]) return message.reply("Don't leave spaces!");
    message.channel.send(eval(args));
}

module.exports.help = {
    name: "calculate",
    aliases: ["calc"]
}