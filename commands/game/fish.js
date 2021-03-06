const Discord = require("discord.js");
const charData = require("../../models/game.js");
const mongoose = require("mongoose");
const ms = require("parse-ms");
const ratelimitMap = new Map();

module.exports.run = async(bot, message, args) => {

    
    const ratelimit = ratelimitMap.get(message.author.id)
    if(ratelimit !== null && (Date.now() - ratelimit) < 0 ){
        let timeObj = ms((ratelimit - Date.now()));
        return message.reply(`You must wait ${timeObj.seconds-1} sec(s) until you are finished!`);
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
                minelvl: 1,
                active: false
            })
            newChar.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            return message.channel.send("**Please try again**");
        }

       
        if(char.active === false){
        char.active = true;
        char.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
        //let fishstr = Math.floor(char.strength/10);
        let fishlvl = Math.floor(char.fishlvl/10);
        //let fishplus = fishstr + fishlvl;
        //console.log(woodplus);
        let fishrnd = Math.floor(Math.random()*2);
        let fishgain = fishlvl + fishrnd + 1;
        let fishexprnd = Math.floor(Math.random()*3);
        let fishexpgain = fishexprnd + Math.floor(char.fishlvl*1.5);
        let nextfishlvl = Math.floor(Math.pow(char.fishlvl, 2.5));


        let fishEmbed = new Discord.RichEmbed()
        .setTitle("Fishing")
        .setColor("#006994")
        .setDescription("You are off to go fish for a little while...");
        message.channel.send(fishEmbed);
        

        let fishGainEmbed = new Discord.RichEmbed()
        .setAuthor("Fishing")
        .setTitle("**You are back from fishing!**")
        .setColor("#006994");
            

        setTimeout(function(){
            char.fish = char.fish + fishgain;
            char.fishexp = char.fishexp + fishexpgain;
            fishGainEmbed.addField("Fish Caught", `\`\`\`+${fishgain}\`\`\``, true);
            fishGainEmbed.addField("Fishing EXP Gained", `\`\`\`+${fishexpgain}\`\`\``, true);
            message.channel.send(fishGainEmbed);
            char.active = false;
            char.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            setTimeout(function(){
                if(char.fishexp >= nextfishlvl){
                    char.fishlvl = char.fishlvl + 1;
                    let lvlupEmbed = new Discord.RichEmbed()
                    .setTitle("**Your fishing skills leveled up!**")
                    //.setThumbnail("../../images/greenarrow.png")
                    .setColor("#32CD32")
                    .setDescription(`${message.author.username}, you now have a fishing skill level of ${char.fishlvl-1}!`);
                    message.channel.send(lvlupEmbed);
                    char.save()
                    .then(result => console.log(result))
                    .catch(err => console.log(err));
                }
            }, 1000);
        }, 20000);

        ratelimitMap.set(message.author.id, Date.now() + 21000);
    }else return;
    
    });
}

module.exports.help = {
    name: "fish"
}