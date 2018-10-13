const Discord = require("discord.js");
const charData = require("../../models/game.js");
const moment = require("moment");
const mongoose = require("mongoose");

module.exports.run = async(bot, message, args) => {

    let place = args[0];
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
                time: "no",
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
        
        let nextlvl = Math.ceil(Math.pow(char.charlvl, 2.5));
        let trainEmbed = new Discord.RichEmbed()
        .setTitle("Training");
        let statEmbed = new Discord.RichEmbed()
        .setTitle("Training Status🏋")
        .setThumbnail(message.author.displayAvatarURL);

        if(place === "park" && char.park === false){
            
            trainEmbed.setDescription("You have decided to train in the park!");
            trainEmbed.addField("Duration", `\`\`\`5 mins\`\`\``);
            char.park = true;
            char.time = Date.now();
            char.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            message.channel.send(trainEmbed);

            setTimeout(() => {
            let xprnd = Math.ceil(Math.random()*2)+4;
            char.charxp = char.charxp + xprnd;
            statEmbed.addField("You have completed your training session!", `\`\`\`+${xprnd} EXP\`\`\``);
            char.park = false;
            message.author.send(statEmbed);
            char.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));

            setTimeout(() => {
                if(char.charxp >= nextlvl){
                    char.charlvl = char.charlvl + 1;
                    let lvlupEmbed = new Discord.RichEmbed()
                    .setTitle("**Your character leveled up!**")
                    //.setThumbnail("../../images/greenarrow.png")
                    .setColor("#32CD32")
                    .setDescription(`${message.author.username}, you are now level ${char.charlvl-1}!`);
                    message.author.send(lvlupEmbed);
                    char.save()
                    .then(result => console.log(result))
                    .catch(err => console.log(err));
                }
            }, 1000);

            }, 300000);

        }else if(!place){
            message.reply("**Please specify what place you want to go and train.**");
            trainEmbed.addField("Places to train", "`park` not available yet: `beach` `gym` `dojo`");
            return message.channel.send(trainEmbed);
        }
        else if(char.park === true) return message.reply("You are already training!");
    
    });

}

module.exports.help = {
    name: "train"
}