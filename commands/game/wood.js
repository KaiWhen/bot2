const Discord = require("discord.js");
const charData = require("../../models/game.js");
const mongoose = require("mongoose");
const ms = require("ms");
const ratelimitMap = new Map();

module.exports.run = async(bot, message, args) => {


    const ratelimit = ratelimitMap.get(message.author.id)
    if(ratelimit !== null && (Date.now() - ratelimit) < 0 ){
        let timeObj = ms(parseInt((ratelimit - Date.now())));
        return message.reply(`You must wait until you are finished!`);
    }
    
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
                minelvl: 1
            })
            newChar.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            return message.channel.send("**Please try again**");
        }

        
        let woodstr = Math.floor(char.strength/5);
        let woodlvl = Math.floor(char.woodlvl/3);
        let woodplus = woodstr + woodlvl;
        console.log(woodplus);
        let woodrnd = Math.floor(Math.random()*5);
        let woodgain = woodrnd + woodplus;
        let woodexprnd = Math.floor(Math.random()*3);
        let woodexpgain = woodexprnd + Math.ceil(char.woodlvl*1.5);
        let nextwoodlvl = Math.floor(Math.pow(char.woodlvl, 2.5));


        let woodEmbed = new Discord.RichEmbed()
        .setTitle("Woodcutting🌲")
        .setColor("#855e42")
        .setDescription("You are off to cut some wood for a little while...");
        message.channel.send(woodEmbed);
        

        let woodGainEmbed = new Discord.RichEmbed()
        .setAuthor("Woodcutting🌲")
        .setTitle("**You are back from woodcutting!**")
        .setColor("#855e42");
            

        setTimeout(() => {
            char.wood = char.wood + woodgain;
            char.woodexp = char.woodexp + woodexpgain;
            woodGainEmbed.addField("Wood Gained", `+${woodgain}`, true);
            woodGainEmbed.addField("Woodcutting EXP Gained", `+${woodexpgain}`);
            message.channel.send(woodGainEmbed);
            char.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            setTimeout(() => {
                if(char.woodexp >= nextwoodlvl){
                    char.woodlvl = char.woodlvl + 1;
                    let lvlupEmbed = new Discord.RichEmbed()
                    .setTitle("**Your woodcutting skills leveled up!**")
                    //.setThumbnail("../../images/greenarrow.png")
                    .setColor("#32CD32")
                    .setDescription(`${message.author.username}, you now have a woodcutting skill level of ${char.woodlvl-1}!`);
                    message.channel.send(lvlupEmbed);
                    char.save()
                    .then(result => console.log(result))
                    .catch(err => console.log(err));
                }
            }, 1000);
        }, 15000);

        ratelimitMap.set(message.author.id, Date.now() + 16000);

    
    });
}

module.exports.help = {
    name: "wood"
}
