const Discord = require("discord.js");
const charData = require("../../models/game.js");
const mongoose = require("mongoose");

module.exports.run = async(bot, message, args) => {

    charData.findOne({
        userID: message.author.id
    }, (err, char) => {
        if(err) console.log(err);
        if(!char){
            const newChar = new charData({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                username: message.author.username,
                charxp: 0,
                charlvl: 1,
                strength: 5,
                defence: 5,
                time: "not active",
                park: false,
                gym: false,
                dojo: false,
                wood: 0,
                woodexp: 0,
                woodlvl: 1,
                fish: 0,
                fishexp: 0,
                fishlvl: 1,
                minexp: 0,
                minelvl: 1,
                active: false
            })
            newChar.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            return message.channel.send("**Please try again**");
        }

        let userIcon = message.author.displayAvatarURL;
        const skillEmbed = new Discord.RichEmbed()
        .setTitle(`${message.author.username} - Skills`)
        .addField("Tree-cutting", `Level: ${char.woodlvl}\nEXP: ${char.woodexp}`, true)
        .addField("Fishing", `Level: ${char.fishlvl}\nEXP: ${char.fishexp}`, true)
        .addField("Mining", `Level: ${char.minelvl}\nEXP: ${char.minexp}`, true);

        message.channel.send(skillEmbed);

    });
}

module.exports.help = {
    name: "skill"
}