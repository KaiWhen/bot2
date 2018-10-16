const Discord = require("discord.js");
const mongoose = require("mongoose");
const invData = require("../../models/invData.js");
const items = require("../../items.js");

module.exports.run = async(bot, message, args) => {

    invData.findOne({
        userID: message.author.id
    }, (err, inv) => {
        if(err) console.log(err);
        if(!inv){
            const newInv = new invData({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                username: message.author.username,
                pick: "Stone Pickaxe",
                pickspeed: 250,
                axe: "Stone Axe",
                weapon: "not equipped",
                pickdur: 0,
                axedur: 100,
                weapondam: 0,
                ore: [],
                bar: []
            });
            newInv.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            return message.channel.send("**Please try again**");
        }

        let amountkey = {"amount": 0}
        let copper = items.ore[0];
        inv.ore.push(items.ore[0]);
        invData.findOneAndUpdate({userID: message.author.id}, {$push: {ore: copper}});
        invData.findOneAndUpdate({userID: message.author.id}, {$push: {ore: amountkey}});
        inv.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));

        return message.channel.send("yep");

    });
}

module.exports.help = {
    name: "invtest"
}