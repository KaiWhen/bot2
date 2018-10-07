const Discord = require("discord.js");
const Money = require("../../models/moneys.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

module.exports.run = async(bot, message, args) => {
    Money.findOne({
        userID: message.author.id,
        serverID: message.guild.id,
        money: money
    }, (err, daily) => {
        if(err) console.log(err);
        let dailyEmbed = new Discord.RichEmbed()
        .setColor("#FFDF00")
        if(daily != moment().format('L')){
            daily.daily = moment().format('L');
            daily.money = daily.money + 250;
            dailyEmbed.addField("**Daily Reward**", "+250", true);
            daily.save()
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