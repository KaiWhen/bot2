const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    
    let rpsdact = true;
    

    let user2 = message.mentions.members.first();
    if(!user2) return message.reply("**User not found!**");

    await message.channel.send(`${user2.user.id}, do accept ${message.author.id}'s challenge? yes or no`);
    if(user2 && message.content === "yes"){
        await message.channel.send("choose between rock, paper and scissors");
        if(message.author && message.content === "rock"){
            let rock = "rock";
        }
    }

}

module.exports.help = {
    name: "rpsduel"
}