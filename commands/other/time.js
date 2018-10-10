const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async(bot, message, args) => {

    // let a = moment().format("L LT");
    // let b = moment("10/10/2018 13:12:23 PM");
    // let bb = b.toISOString();
    // //message.channel.send(parseInt(b.from(a)));
    // let added = moment(bb.add(5, 'seconds'));
    let timefrom = moment.duration(chartime.from(timenow)).asMinutes;
    message.channel.send(timefrom);
}

module.exports.help = {
    name: "datetest"
}