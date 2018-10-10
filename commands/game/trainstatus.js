const Discord = require("discord.js");
const charData = require("../../models/game.js");
const moment = require("moment");
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
                charlvl: 0,
                strength: 5,
                defence: 5,
                time: "not active",
                park: false,
                gym: false,
                dojo: false
            })
            newChar.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            return message.channel.send("**Please try again**");
        }

        let statEmbed = new Discord.RichEmbed()
        .setTitle("Training Status 🏋")
        .setThumbnail(message.author.displayAvatarURL);
        
        let timenow = moment().toISOString("L LT");
        chartime = moment(char.time);
        let timefrom = parseInt(chartime.from(timenow));
        let timeleft = 5 - timefrom;
        if(timefrom === 0) timeleft = 5;
        

        if(char.park === false) return message.reply("**You are not currently training**");

        if(char.park === true && timeleft <= 0){
            char.charxp = char.charxp + 10;
            statEmbed.addField("You have completed your training session!", `+10 EXP\n`);
            char.park = false;
            char.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            return message.channel.send(statEmbed);
        }
            
        else if(char.park === true && timeleft > 0 && timeleft <=5){
            
            statEmbed.addField("Time Remaining", `${timeleft} minute(s)`);
            return message.channel.send(statEmbed);

        }else if(char.park === true && timeleft === 5){
            statEmbed.addField("Time Remaining", `5 minute(s)`);
            return message.channel.send(statEmbed);
        }

    });
}

module.exports.help = {
    name: "trainstatus"
}