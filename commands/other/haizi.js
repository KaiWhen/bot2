const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    
    if(message.author.id == 282617728320405514) {
        
        let haiziReceiver = message.mentions.members.first();
        haiziReceiver.send("孩子");

    }
    else return;
}

module.exports.help = {
    name: "haizi"
}