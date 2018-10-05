const Discord = require("discord.js");
const fs = ("fs");

module.exports.run = async(bot, message, args) => {

if(message.author.bot) return;
if(message.author.type === "dm") return;


let sayRnd = new Array();

sayRnd[0] = "fuk u";
sayRnd[1] = "Hello!";
sayRnd[2] = "u suck";
sayRnd[3] = "How are you?";
sayRnd[4] = "something";
sayRnd[5] = "YEET";
sayRnd[6] = "YEET DAB";
sayRnd[7] = "Merry Christmas!";
sayRnd[8] = "you are stupid :)";

    let rnd = Math.floor(Math.random()*9)
    return message.channel.send(sayRnd[rnd]);

}

module.exports.help = {
    name: "saysomething"
}
