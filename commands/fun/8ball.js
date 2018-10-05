const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    
    if(!args[2]) return message.reply("Please ask a full question.");

    let ball = new Array();
    ball[0] = "Signs point to yes.";
    ball[1] = "My sources say no.";
    ball[2] = "Maybe.";
    ball[3] = "Most definitely.";
    ball[4] = "I don't know.";
    ball[5] = "Most certainly not.";
    ball[6] = "Outlook good.";
    ball[7] = "Cannot predict now.";
    ball[8] = "My reply is yes.";
    ball[9] = "I don't care.";
    ball[10] = "Yes. No. Maybe. IDK.";
    ball[11] = "Sorry what was that?";

    let ballrnd = Math.floor(Math.random()*ball.length);
    message.channel.send("8ball: **" + ball[ballrnd] + "**");

}

module.exports.help = {
    name: "8ball"
}