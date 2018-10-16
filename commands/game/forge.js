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
            
            let material = args[0];
            let tool = args[1];
            let amount = args[2];
            let icon = message.author.displayAvatarURL;
            let forgeEmbed = new Discord.RichEmbed()
            .setAuthor(`Tool Forge`, `${icon}`);

            if(!material || !tool || !amount) return message.reply("``,forge <material> <tool> <amount>``");
            if(isNaN(amount) || amount > 1) return message.reply("You can only forge 1 tool at a time.");
        
            if(material === "copper" && tool === "pickaxe" && amount === 1){
                if(inv.copper.bar < 6) return message.reply("Not enough Copper Bars!");
                if(inv.copper.pick === 1) return message.reply("I don't think you need 2 of those...");
                inv.copper.bar -= 6;
                inv.copper.pick = 1;
                forgeEmbed.setDescription("You just forged a Copper Pickaxe!");
                forgeEmbed.addField("Bars used", `6`);
                inv.save()
                .catch(err => console.log(err));
                return message.channel.send(forgeEmbed);
            }
            else if(material === "copper" && tool === "axe" && amount === 1){
                if(inv.copper.bar < 7) return message.reply("Not enough Copper Bars!");
                if(inv.copper.axe === 1) return message.reply("I don't think you need 2 of those...");
                inv.copper.bar -= 7;
                inv.copper.axe = 1;
                forgeEmbed.setDescription("You just forged a Copper Axe!");
                forgeEmbed.addField("Bars used", `7`);
                inv.save()
                .catch(err => console.log(err));
                return message.channel.send(forgeEmbed);
            }
            else if(material === "copper" && tool === "sword" && amount === 1){
                if(inv.copper.bar < 8) return message.reply("Not enough Copper Bars!");
                if(inv.copper.pick === 1) return message.reply("I don't think you need 2 of those...");
                inv.copper.bar -= 8;
                inv.copper.weapon = 1;
                forgeEmbed.setDescription("You just forged a Copper Sword!");
                forgeEmbed.addField("Bars used", `8`);
                inv.save()
                .catch(err => console.log(err));
                return message.channel.send(forgeEmbed);
            }
            else if(material === "iron" && tool === "pickaxe" && amount === 1){
                if(inv.iron.bar < 6) return message.reply("Not enough Iron Bars!");
                if(inv.iron.pick === 1) return message.reply("I don't think you need 2 of those...");
                inv.iron.bar -= 6;
                inv.iron.pick = 1;
                forgeEmbed.setDescription("You just forged a Iron Pickaxe!");
                forgeEmbed.addField("Bars used", `6`);
                inv.save()
                .catch(err => console.log(err));
                return message.channel.send(forgeEmbed);
            }
            else if(material === "iron" && tool === "axe" && amount === 1){
                if(inv.iron.bar < 7) return message.reply("Not enough Iron Bars!");
                if(inv.iron.axe === 1) return message.reply("I don't think you need 2 of those...");
                inv.iron.bar -= 7;
                inv.iron.axe = 1;
                forgeEmbed.setDescription("You just forged a Iron Axe!");
                forgeEmbed.addField("Bars used", `7`);
                inv.save()
                .catch(err => console.log(err));
                return message.channel.send(forgeEmbed);
            }
            else if(material === "iron" && tool === "sword" && amount === 1){
                if(inv.iron.bar < 8) return message.reply("Not enough Iron Bars!");
                if(inv.iron.pick === 1) return message.reply("I don't think you need 2 of those...");
                inv.iron.bar -= 8;
                inv.iron.pick = 1;
                forgeEmbed.setDescription("You just forged a Iron Sword!");
                forgeEmbed.addField("Bars used", `8`);
                inv.save()
                .catch(err => console.log(err));
                return message.channel.send(forgeEmbed);
            }

    });
});
}

module.exports.help = {
    name: "forge"
}
