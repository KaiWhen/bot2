const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async(bot, message, args) => {

    let a = moment().format("L LT");
    let b = moment("10/10/2018 13:12:23 PM");
    //message.channel.send(parseInt(b.from(a)));
    let added = b.add(5, 'seconds');
    message.channel.send(added);
}

module.exports.help = {
    name: "datetest"
}