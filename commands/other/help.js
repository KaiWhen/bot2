const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    
    let helpEmbed = new Discord.RichEmbed()
    .setTitle("Commands")
    .addField("Money & EXP", "`money` `daily` `donate <@user>` `level`")
    .addField("Fun", "`say` `saysomething` `8ball` `basket <bet amount>` `rps`")
    .addField("Moderation", "`tempmute`")
    .addField("Miscellaneous", "`cat` `dog`")
    .setFooter("Bot by KaiWhen#9072");

    message.channel.send(helpEmbed);
}

module.exports.help = {
    name: "help"
}