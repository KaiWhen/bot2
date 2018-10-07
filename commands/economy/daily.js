const Discord = require("discord.js");
const userData = require("../../models/userData.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

module.exports.run = async(bot, message, args) => {
    userData.findOne({
        userID: message.author.id,
        //serverID: message.guild.id,
       
    }, (err, money) => {
        if(err) console.log(err);
        let dailyEmbed = new Discord.RichEmbed()
        .setColor("#FFDF00")
        if(!money.prevDaily) money.prevDaily = "not collected";
        if(money.prevDaily != moment().format('L')){
            money.prevDaily = moment().format('L');
            money.money = money.money + 250;
            dailyEmbed.addField("**Daily Reward**", "+250", true);
            money.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            return message.channel.send(dailyEmbed);
            
        }else{
            dailyEmbed.setTitle("**You have already collected your daily reward today**");
            message.channel.send(dailyEmbed);
        }
    })
}

module.exports.help = {
    name: "daily"
}