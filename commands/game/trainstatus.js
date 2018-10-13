const Discord = require("discord.js");
const charData = require("../../models/game.js");
const moment = require("moment");
const mongoose = require("mongoose");
const ms = require("parse-ms");

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

        let statEmbed = new Discord.RichEmbed()
        .setTitle("Training Status🏋")
        .setThumbnail(message.author.displayAvatarURL);
        

        if(char.park === false) return message.reply("You are not currently training.");

        let timepark = 300000 + char.time;
        if(char.park === true && Date.now() < timepark){
            let timeparkleft = timepark - Date.now();
            let timeparkObj = ms(timeparkleft);
            statEmbed.addField("Location", "Park", true);
            statEmbed.addField("Time Remaining", `\`\`\`${timeparkObj.minutes} min(s) ${timeparkObj.seconds}sec(s)\`\`\``);
            return message.channel.send(statEmbed);
        }

       

    });
}

module.exports.help = {
    name: "trainstatus"
}