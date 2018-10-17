const Discord = require("discord.js");
const mongoose = require("mongoose");
const invData = require("../../models/invData.js");

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

            if(material === "copper" && tool === "pickaxe"){
                if(!inv.copper.pick) return message.reply("You do not own a Copper Pickaxe.");
                inv.pick = "Copper Pickaxe";
                inv.save()
                .catch(err => console.log(err));
                return message.channel.send(`**Equipped the Copper Pickaxe.**`);
            }
            else if(material === "copper" && tool === "axe"){
                if(!inv.copper.axe) return message.reply("You do not own a Copper Axe.");
                inv.axe = "Copper Axe";
                inv.save()
                .catch(err => console.log(err));
                return message.channel.send(`**Equipped the Copper Axe.**`);
            }
            else if(material === "copper" && tool === "sword"){
                if(!inv.copper.weapon) return message.reply("You do not own a Copper Sword.");
                inv.weapon = "Copper Sword";
                inv.save()
                .catch(err => console.log(err));
                return message.channel.send(`**Equipped the Copper Sword.**`);
            }
            else if(material === "iron" && tool === "pickaxe"){
                inv.pick = "Iron Pickaxe";
                inv.save()
                .catch(err => console.log(err));
                return message.channel.send(`**Equipped the Iron Pickaxe.**`);
            }
            else if(material === "iron" && tool === "axe"){
                inv.axe = "Iron Axe";
                inv.save()
                .catch(err => console.log(err));
                return message.channel.send(`**Equipped the Iron Axe.**`);
            }
            else if(material === "iron" && tool === "sword"){
                inv.weapon = "Iron Sword";
                inv.save()
                .catch(err => console.log(err));
                return message.channel.send(`**Equipped the Iron Sword.**`);
            }

    });
}

module.exports.help = {
    name: "equip"
}
