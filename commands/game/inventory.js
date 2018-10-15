const Discord = require("discord.js");
const charData = require("../../models/game.js");
const mongoose = require("mongoose");

module.exports.run = async(bot, message, args) => {
    
    
    charData.findOne({
        userID: message.author.id
    }, (err, char) => {
        if(err) console.log(err);
        if(!char){
            const newChar = new charData({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                username: message.author.username,
                charxp: 0,
                charlvl: 1,
                strength: 5,
                defence: 5,
                time: "not active",
                park: false,
                gym: false,
                dojo: false,
                wood: 0,
                woodexp: 0,
                woodlvl: 1,
                fish: 0,
                fishexp: 0,
                fishlvl: 1,
                minexp: 0,
                minelvl: 1,
                active: false
            })
            newChar.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            return message.channel.send("**Please try again**");
        }

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
                    copper: {ore: 0, bar: 0, weapon: false, pick: false, axe: false},
                    iron: {ore: 0, bar: 0, weapon: false, pick: false, axe: false},
                    silver: {ore: 0, bar: 0, weapon: false, pick: false, axe: false},
                    nickel: {ore: 0, bar: 0, weapon: false, pick: false, axe: false},
                    gold: {ore: 0, bar: 0, weapon: false, pick: false, axe: false},
                    platinum: {ore: 0, bar: 0, weapon: false, pick: false, axe: false},
                    ruthenium: {ore: 0, bar: 0, weapon: false, pick: false, axe: false},
                    titanium: {ore: 0, bar: 0, weapon: false, pick: false, axe: false},
                    molybdenum: {ore: 0, bar: 0, weapon: false, pick: false, axe: false},
                    rhenium: {bar: 0, weapon: false, pick: false, axe: false},
                    iridium: {bar: 0, weapon: false, pick: false, axe: false},
                    osmium: {bar: 0, weapon: false, pick: false, axe: false},
                    diamond: {bar: 0, weapon: false, pick: false, axe: false}
                })
                newInv.save()
                .then(result => console.log(result))
                .catch(err => console.log(err));
                return message.channel.send("**Please try again**");
            }

        let userIcon = message.author.displayAvatarURL;
        let invEmbed = new Discord.RichEmbed()
        .setAuthor(`${message.author.username}'s inventory`, userIcon)
        .addField("Wood", `\`\`\`${char.wood}\`\`\``, true)
        .addField("Fish", `\`\`\`${char.fish}\`\`\``, true);

        if(inv.copper.ore > 0) invEmbed.addField("Copper Ore", `${inv.copper.ore}`);
        if(inv.iron.ore > 0) invEmbed.addField("Iron Ore", `${inv.copper.ore}`);
        
        message.channel.send(invEmbed);

    });
});
}

module.exports.help = {
    name: "inv"
}