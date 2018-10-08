const Discord = require("discord.js");
const userData = require("../../models/userData.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.run = async(bot, message, args) => {
    
    userData.findOne({
        userID: message.author.id
    }, (err, xp) => {
        if(err) console.log(err);
        if(!xp){
            const newExp = new userData({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                username: message.author.username,
                money: 500,
                exp: 0,
                lvl: 1,
                prevDaily: "not collected"
            })
            newExp.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            return message.channel.send("**Please try again**");
        }

        let nextlvl = Math.ceil(xp.lvl ^ 3);
        let expleft = nextlvl - xp.exp;
        let lvlEmbed = new Discord.RichEmbed()
        .setTitle(`**${message.author.username}**`)
        .setThumbnail(`${message.author.displayAvatarURL}`)
        .addField("Level", `${xp.lvl}`, true)
        .addField("EXP Points", `${xp.exp}`, true)
        .setFooter(`EXP needed for next level-up: ${expleft}`)

        message.channel.send(lvlEmbed);
    });
    
    
}

module.exports.help = {
    name: "level"
}