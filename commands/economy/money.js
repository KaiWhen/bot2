const Discord = require("discord.js");
const Money = require("../../storage/moneys.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.run = async(bot, message, args) => {
    if(message.author.bot) return;
    if(message.author.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");

    if(message.content.startsWith(prefix)){
        let commandfile = bot.commands.get(command.slice(prefix.length));
        if(commandfile) commandfile.run(bot, message, args);
    }else{
        Money.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, (err, money) => {
            if(err) console.log(err);
            if(!money){
                const newMoney = new Money({
                    userID: message.author.id,
                    username: message.author.username,
                    serverID: message.guild.id,
                    money: 500
                })
                newMoney.save().catch(err => console.log(err));
            }
            
        });
    }
}
