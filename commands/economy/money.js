const Discord = require("discord.js");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.run = async(bot, message, args) => {
    if(message.author.bot) return;
    if(message.author.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");

    
    
}

module.exports.help = {
    name: "dfgfdgfdg"
}