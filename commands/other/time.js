const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async(bot, message, args) => {

    let a = moment().format("L LTS");
    let b = moment("10/10/2018 14:12:23 PM");
    message.channel.send(parseInt(b.from(a)));
}

module.exports.help = {
    name: "datetest"
}