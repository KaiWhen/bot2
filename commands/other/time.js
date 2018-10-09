const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async(bot, message, args) => {

    let time = moment().get('month').get('date').get('hour').get('minute');
    let showtime = moment(time).format("M D H m");
    message.channel.send(time);
}

module.exports.help = {
    name: "datetest"
}