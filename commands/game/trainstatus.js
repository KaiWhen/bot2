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
        .setTitle("Training Status🏋")
        .setThumbnail(message.author.displayAvatarURL);
        
        let timenow = moment().toISOString("L LT");
        chartime = moment(char.time);
        let timefrom = parseInt(chartime.from(timenow));
        let timeleft = 5 - timefrom;
        if(!timefrom) timeleft = 5;
        
        let nextlvl = Math.ceil(Math.pow(user.lvl, 2.5));

        if(char.park === false) return message.reply("**You are currently not training**");

        if(char.park === true && timeleft <= 0){
            let xprn = Math.ceil(Math.random()*4);
            char.charxp = char.charxp + xprnd;
            statEmbed.addField("You have completed your training session!", `+${xprnd} EXP`);
            char.park = false;
            message.channel.send(statEmbed);
            
            if(char.exp >= nextlvl){
                user.lvl = user.lvl + 1;
                let lvlupEmbed = new Discord.RichEmbed()
                .setTitle("**Your character leveled up!**")
                .setThumbnail("../../images/greenarrow.png")
                .setColor("#32CD32")
                .setDescription(`${message.author.username}, you are now level ${char.lvl}!`);
                message.channel.send(lvlupEmbed);
            }

            char.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            return;
        }
            
        else if(char.park === true && timeleft > 0){
            statEmbed.addField("Location", "Park", true);
            statEmbed.addField("Time Remaining", `${timeleft} minute(s)`);
            return message.channel.send(statEmbed);

        }

    });
}

module.exports.help = {
    name: "trainstatus"
}