const Discord = require("discord.js");
const charData = require("../../models/game.js");
const invData = require("../../models/invData.js");
const mongoose = require("mongoose");
const ms = require("parse-ms");
const ratelimitMap = new Map();

module.exports.run = async (bot, message, args) => {


    const ratelimit = ratelimitMap.get(message.author.id)
    if (ratelimit !== null && (Date.now() - ratelimit) < 0) {
        let timeObj = ms((ratelimit - Date.now()));
        let statEmbed = new Discord.RichEmbed()
            .setTitle("Mining")
            .setThumbnail(`${message.author.displayAvatarURL}`)
            .addField("Time Remaining", `\`\`\`${timeObj.minutes} min(s) ${timeObj.seconds} sec(s)\`\`\``);
        return message.channel.send(statEmbed);
    }

    charData.findOne({
        userID: message.author.id
    }, (err, char) => {
        if (err) console.log(err);
        if (!char) {
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
            if (err) console.log(err);
            if (!inv) {
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
                    copper: {
                        ore: 0,
                        bar: 0,
                        weapon: 0,
                        pick: 0,
                        axe: 0
                    },
                    iron: {
                        ore: 0,
                        bar: 0,
                        weapon: 0,
                        pick: 0,
                        axe: 0
                    },
                    silver: {
                        ore: 0,
                        bar: 0,
                        weapon: 0,
                        pick: 0,
                        axe: 0
                    },
                    nickel: {
                        ore: 0,
                        bar: 0,
                        weapon: 0,
                        pick: 0,
                        axe: 0
                    },
                    gold: {
                        ore: 0,
                        bar: 0,
                        weapon: 0,
                        pick: 0,
                        axe: 0
                    },
                    platinum: {
                        ore: 0,
                        bar: 0,
                        weapon: 0,
                        pick: 0,
                        axe: 0
                    },
                    ruthenium: {
                        ore: 0,
                        bar: 0,
                        weapon: 0,
                        pick: 0,
                        axe: 0
                    },
                    titanium: {
                        ore: 0,
                        bar: 0,
                        weapon: 0,
                        pick: 0,
                        axe: 0
                    },
                    molybdenum: {
                        ore: 0,
                        bar: 0,
                        weapon: 0,
                        pick: 0,
                        axe: 0
                    },
                    rhenium: {
                        bar: 0,
                        weapon: 0,
                        pick: 0,
                        axe: 0
                    },
                    iridium: {
                        bar: 0,
                        weapon: 0,
                        pick: 0,
                        axe: 0
                    },
                    osmium: {
                        bar: 0,
                        weapon: 0,
                        pick: 0,
                        axe: 0
                    },
                    diamond: {
                        bar: 0,
                        weapon: 0,
                        pick: 0,
                        axe: 0
                    }
                })
                newInv.save()
                    .then(result => console.log(result))
                    .catch(err => console.log(err));
                return message.channel.send("**Please try again**");
            }

            if (char.active === false) {
                char.active = true;
                char.save()
                    .then(result => console.log(result))
                    .catch(err => console.log(err));
                if (inv.pick.toLowerCase() === "stone pickaxe") {
                    inv.pickspeed = 250;
                    inv.save()
                        .then(result => console.log(result))
                        .catch(err => console.log(err));
                } else if (inv.pick.toLowerCase() === "copper pickaxe") {
                    inv.pickspeed = 10000;
                    inv.save()
                        .then(result => console.log(result))
                        .catch(err => console.log(err));
                } else if (inv.pick.toLowerCase() === "iron pickaxe") {
                    inv.pickspeed = 20000;
                    inv.save()
                        .then(result => console.log(result))
                        .catch(err => console.log(err));
                }
                let minexprnd = Math.floor(Math.random() * 4);
                let minexpgain = minexprnd + char.minelvl;
                let nextminelvl = Math.floor(Math.pow(char.minelvl, 2.6));
                let minespeed = 600250 - inv.pickspeed;

                let copperrnd = Math.floor(Math.random() * 1) + 3;
                let ironrnd = Math.floor(Math.random() * 1) + 3;
                let silverrnd = Math.floor(Math.random() * 1) + 2;
                let nickelrnd = Math.floor(Math.random() * 1) + 3;

                let silverchance = Math.floor(Math.random() * 4);
                let nickelchance = Math.floor(Math.random() * 3);

                let mineEmbed = new Discord.RichEmbed()
                    .setTitle("Mining")
                    .setColor("#855e42")
                    .setDescription("You are off to the mines for a while!")
                    .addField("Pickaxe", `${inv.pick.toUpperCase()}`);
                message.channel.send(mineEmbed);


                let mineGainEmbed = new Discord.RichEmbed()
                    .setAuthor("Mining")
                    .setTitle("**You are back from mining!**")
                    .setColor("#855e42");

                let oremined = [];


                setTimeout(() => {
                    if (inv.pick.toLowerCase() === "stone pickaxe") {
                        inv.copper.ore += copperrnd;
                        oremined.push(`Copper Ore +${copperrnd}`);
                        char.minexp += minexpgain;
                        mineGainEmbed.addField("Ores Mined", `${oremined.join("\n")}`, true);
                        mineGainEmbed.addField("Mining EXP Gained", `+${minexpgain}`, true);
                        inv.save()
                            .then(result => console.log(result))
                            .catch(err => console.log(err));
                    } else if (inv.pick.toLowerCase() === "copper pickaxe") {
                        inv.copper.ore += copperrnd;
                        oremined.push(`Copper Ore +${copperrnd}`);
                        inv.iron.ore += ironrnd;
                        oremined.push(`Iron Ore +${ironrnd}`);
                        char.minexp += minexpgain;
                        mineGainEmbed.addField("Ores Mined", `${oremined.join("\n")}`, true);
                        mineGainEmbed.addField("Mining EXP Gained", `+${minexpgain}`, true);
                        inv.save()
                            .then(result => console.log(result))
                            .catch(err => console.log(err));
                    } else if (inv.pick.toLowerCase() === "iron pickaxe") {
                        inv.copper.ore += copperrnd;
                        oremined.push(`Copper Ore +${copperrnd}`);
                        inv.iron.ore += ironrnd;
                        oremined.push(`Iron Ore +${ironrnd}`);
                        if(silverchance === 0){
                            inv.silver.ore += silverrnd;
                            oremined.push(`Silver Ore: +${silverrnd}`);
                        } else if (nickelchance === 1){
                            inv.nickel.ore += nickelrnd;
                            oremined.push(`Nickel Ore: +${nickelrnd}`);
                        }
                        char.minexp += minexpgain;
                        mineGainEmbed.addField("Ores Mined", `${oremined.join("\n")}`, true);
                        mineGainEmbed.addField("Mining EXP Gained", `+${minexpgain}`, true);
                        inv.save()
                            .then(result => console.log(result))
                            .catch(err => console.log(err));
                    }
                    message.channel.send(mineGainEmbed);
                    char.active = false;
                    char.save()
                        .then(result => console.log(result))
                        .catch(err => console.log(err));
                    setTimeout(() => {
                        if (char.minexp >= nextminelvl) {
                            char.minelvl = char.minelvl + 1;
                            let lvlupEmbed = new Discord.RichEmbed()
                                .setTitle("**Your mining skills leveled up!**")
                                //.setThumbnail("../../images/greenarrow.png")
                                .setColor("#32CD32")
                                .setDescription(`${message.author.username}, you now have a mining skill level of ${char.minelvl-1}!`);
                            message.channel.send(lvlupEmbed);
                            char.save()
                                .then(result => console.log(result))
                                .catch(err => console.log(err));
                        }
                    }, 1000);
                }, minespeed);

            
                ratelimitMap.set(message.author.id, Date.now() + minespeed);
            } else {
                return message.reply("You are already doing something.");
            }

        });
    });
    }

module.exports.help = {
    name: "mine"
}