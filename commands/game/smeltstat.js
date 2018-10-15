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
                active: false,
                smelt: false,
                smelttime: 0,
                smeltstamp: 0
            })
            newChar.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            return message.channel.send("**Please try again**");
        }

        let smeltEmbed = new Discord.RichEmbed()
        .setTitle("Smelting with Furnace")
        .setThumbnail(message.author.displayAvatarURL);
        

        if(char.smelt === false) return message.reply("You are not currently smelting anything.");

        let timesmelt = char.smelttime + char.smeltstamp;
        if(char.smelt === true && Date.now() < timesmelt){
            let timesmeltleft = timesmelt - Date.now();
            let timesmeltObj = ms(timesmeltleft);
            smeltEmbed.addField("Time Remaining", `\`\`\`${timesmeltObj.minutes} min(s) ${timesmeltObj.seconds} sec(s)\`\`\``);
            return message.channel.send(smeltEmbed);
        }

       

    });
}

module.exports.help = {
    name: "smelting"
}