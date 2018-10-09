const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async(bot, message, args) => {

    let a = moment().format("L LT");
    let b = moment("10/09/2018 11:08:23 PM");
    message.channel.send(parseInt(b.from(a)));
}

module.exports.help = {
    name: "datetest"
}