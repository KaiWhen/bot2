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

        let trainEmbed = new Discord.RichEmbed()
        .setTitle("Training");

        if(place === "park" && char.park === false){
            
            trainEmbed.setDescription("You have decided to train in the park!\n\nDuration: 5 minutes\n\n,trainstatus to check your progress");
            char.park = true;
            let timenow = moment().toISOString("L LT");
            char.time = timenow;
            char.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            return message.channel.send(trainEmbed);
        }else{
            return message.reply("**Please specify what place you want to go and train.**");
        }
    });

}

module.exports.help = {
    name: "train"
}