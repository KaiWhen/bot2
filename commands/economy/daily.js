const Discord = require("discord.js");
const Money = require("../../models/moneys.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

module.exports.run = async(bot, message, args) => {
    Money.findOne({
        userID: message.author.id,
        serverID: message.guild.id,
       
    }, (err, money) => {
        if(err) console.log(err);
        let dailyEmbed = new Discord.RichEmbed()
        .setColor("#FFDF00")
        let prevDaily = prevDaily.money;
        let mome = moment().format('L');
        if(prevDaily != mome){
            prevDaily = mome;
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