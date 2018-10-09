const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async(bot, message, args) => {

    
    message.channel.send(moment().format("L LTS"));
}

module.exports.help = {
    name: "datetest"
}