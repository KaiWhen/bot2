const Discord = require("discord.js");
const charData = require("../../models/game.js");
const userData = require("../../models/userData.js");
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
                woodlvl: 1
            })
            newChar.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            return message.channel.send("**Please try again**");
        }

        userData.findOne({
            userID: message.author.id
        }, (err, user) => {
            if(err) console.log(err);

                let resource = args[0];
                let amnt = args[1];
                let check = char.wood - amnt;
                let sellamnt = amnt*3;

                let sellEmbed = new Discord.RichEmbed()
                .setTitle(`${message.author.username} - Sell💰`)
                .setColor("#228B22")
                .setDescription("Successfully sold!")
                .addField("Sold", `\`\`\`${amnt} ${resource}\`\`\``);


                if(resource === "wood"){
                    if(check < 0){
                        return message.reply("Not enough wood!");
                    }else{
                        user.money = user.money + sellamnt;
                        char.wood = char.wood - amnt;
                        sellEmbed.addField("Amount", `\`\`\`${sellamnt} KaiKoins\`\`\``);
                        char.save()
                        .then(result => console.log(result))
                        .catch(err => console.log(err));
                        user.save()
                        .then(result => console.log(result))
                        .catch(err => console.log(err));
                        return message.channel.send(sellEmbed);
                    }


                }
           
        });

    });
}

module.exports.help = {
    name: "sell"
}