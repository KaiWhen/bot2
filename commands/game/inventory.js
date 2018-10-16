const Discord = require("discord.js");
const charData = require("../../models/game.js");
const mongoose = require("mongoose");
const invData = require("../../models/invData.js");

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
                    copper: {ore: 0, bar: 0, weapon: 0, pick: 0, axe: 0},
                    iron: {ore: 0, bar: 0, weapon: 0, pick: 0, axe: 0},
                    silver: {ore: 0, bar: 0, weapon: 0, pick: 0, axe: 0},
                    nickel: {ore: 0, bar: 0, weapon: 0, pick: 0, axe: 0},
                    gold: {ore: 0, bar: 0, weapon: 0, pick: 0, axe: 0},
                    platinum: {ore: 0, bar: 0, weapon: 0, pick: 0, axe: 0},
                    ruthenium: {ore: 0, bar: 0, weapon: 0, pick: 0, axe: 0},
                    titanium: {ore: 0, bar: 0, weapon: 0, pick: 0, axe: 0},
                    molybdenum: {ore: 0, bar: 0, weapon: 0, pick: 0, axe: 0},
                    rhenium: {bar: 0, weapon: 0, pick: 0, axe: 0},
                    iridium: {bar: 0, weapon: 0, pick: 0, axe: 0},
                    osmium: {bar: 0, weapon: 0, pick: 0, axe: 0},
                    diamond: {bar: 0, weapon: 0, pick: 0, axe: 0}
                })
                newInv.save()
                .then(result => console.log(result))
                .catch(err => console.log(err));
                return message.channel.send("**Please try again**");
            }

        let ores = [];
        let resources = [];
        let bars = [];
        let userIcon = message.author.displayAvatarURL;
        let invEmbed = new Discord.RichEmbed()
        .setAuthor(`${message.author.username}'s inventory`, userIcon);
        // .addField("Wood", `\`\`\`${char.wood}\`\`\``, true)
        // .addField("Fish", `\`\`\`${char.fish}\`\`\``, true);

        if(char.wood > 0) resources.push(`Wood: ${char.wood}\n`);
        if(char.fish > 0) resources.push(`Fish: ${char.fish}`);

        if(inv.copper.ore > 0) ores.push(`Copper Ore: ${inv.copper.ore}`);
        if(inv.iron.ore > 0) ores.push(`Iron Ore: ${inv.iron.ore}`);

        if(inv.copper.bar > 0) bars.push(`Copper Bar: ${inv.copper.bar}`);
        if(inv.iron.bar > 0) bars.push(`Iron Bar: ${inv.iron.bar}`);

        
        if(resources) invEmbed.addField("Resources", `${resources.join("")}`);
        if(ores) invEmbed.addField("Ores", `${ores.join("\n")}`);
        if(bars) invEmbed.addField("Bars", `${bars.join("\n")}`);
        message.channel.send(invEmbed);

    });
});
}

module.exports.help = {
    name: "inv"
}
