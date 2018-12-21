const Discord = require("discord.js");
const charData = require("../../models/game.js");
const invData = require("../../models/invData.js");
const mongoose = require("mongoose");

module.exports.run = async (bot, message, args) => {

    let tofight = message.mentions.members.first();
    
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

        charData.findOne({
            userID: tofight.id
        }, (err, char) => {
            if(err) console.log(err);
            if(!char){
                const newChar = new charData({
                    _id: mongoose.Types.ObjectId(),
                    userID: tofight.id,
                    username: tofight.user.username,
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
                    copper: {ore: 0, bar: 0, weapon: 0, pick: 0, axe: 0, cp: 0},
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

            invData.findOne({
                userID: tofight.id
            }, (err, inv) => {
                if(err) console.log(err);
                if(!inv){
                    const newInv = new invData({
                        _id: mongoose.Types.ObjectId(),
                        userID: tofight.id,
                        username: tofight.user.username,
                        pick: "Stone Pickaxe",
                        pickspeed: 250,
                        axe: "Stone Axe",
                        weapon: "not equipped",
                        pickdur: 0,
                        axedur: 100,
                        weapondam: 0,
                        copper: {ore: 0, bar: 0, weapon: 0, pick: 0, axe: 0, cp: 0},
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


            const filter = m => tofight.id === m.author.id;
            message.channel.send(`@${tofight.id}, do you wish to have a scrap with @${message.author.id}? Please type Y or N`);
            
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000
            }).then(collected => {

                let agreement = collected.first().content;

                if(agreement.toUpperCase() === "Y"){

                    message.channel.send("The fight is now underway...");
                    let rnd = Math.floor(Math.random()*1)+1;
                    if(rnd === 1){
                        return message.channel.send(`${message.author.username} wins! Wow ${tofight.user.username} what a loser.`);
                    }else if(rnd === 2){
                        return message.channel.send(`${tofight.user.username} wins! Wow ${message.author.username} what a loser.`);
                    }

                }else if(agreement.toUpperCase() === "N"){
                    return message.channel.send("Aww what a wuss");
                }
            }).catch(err => {
                message.channel.send("You spent way too long deciding...");
            })
    });
});
});
});

}

module.exports.help = {
    name: "fight"
}