const Discord = require("discord.js");
const userData = require("../../models/userData.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.run = async(bot, message, args) => {
    userData.findOne({
        userID: message.author.id,
        //serverID: message.guild.id
    }, (err, money) => {
        if(err) console.log(err);
        let moneyEmbed = new Discord.RichEmbed()
        .setThumbnail(message.author.displayAvatarURL)
        .setTitle(`${message.author.username}`)
        .setColor("#FFDF00")
        if(!money){
            
            moneyEmbed.addField("Money", "500", true);
            return message.channel.send(moneyEmbed);
        }else{
            moneyEmbed.addField("Money", money.money, true)
            message.channel.send(moneyEmbed);
        }
    })
}

module.exports.help = {
    name: "money"
}