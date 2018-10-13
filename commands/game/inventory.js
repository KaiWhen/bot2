const Discord = require("discord.js");

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

        let userIcon = message.author.displayAvatarURL;
        let invEmbed = new Discord.RichEmbed()
        .setTitle(`${message.author.username}'s inventory`, userIcon)
        .addField("Wood", `\`\`\`${char.wood}\`\`\``, true)
        .addField("Fish", `\`\`\`${char.fish}\`\`\``, true);
        
        message.channel.send(invEmbed);

    });
}

module.exports.help = {
    name: "inv"
}