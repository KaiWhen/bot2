const Discord = require("discord.js");
const charData = require("../../models/game.js");
const moment = require("moment");

module.exports.run = async(bot, message, args) => {
    
    gameData.findOne({
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
        .setTitle("Training Status");

        if(char.park === true){
            let timenow = moment().format("L LT");
            let timeleft = char.time.from(timenow).pop()===" minutes ago";
            statEmbed.addField("Time remaining", `${timeleft} minutes`);
        }
    });
}

module.exports.help = {
    name: "trainstatus"
}