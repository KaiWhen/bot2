const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    
    let x = parseInt(args[0]);
    let y = parseInt(args[2]);
    if(message.content.includes("x")) return message.reply("Please use '*' instead of 'x' for multiplication");
    //if(args[1]) return message.reply("Don't leave spaces!");
    let answer = eval(args);
    message.channel.send(answer);
}

module.exports.help = {
    name: "calculate",
    aliases: ["calc"]
}