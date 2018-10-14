const Discord = require("discord.js");
const charData = require("../../models/game.js");
const invData = require("../../models/invData.js");
const mongoose = require("mongoose");
const ms = require("parse-ms");
const ratelimitMap = new Map();

module.exports.run = async(bot, message, args) => {


    const ratelimit = ratelimitMap.get(message.author.id)
    if(ratelimit !== null && (Date.now() - ratelimit) < 0 ){
        let timeObj = ms((ratelimit - Date.now()));
        return message.reply(`You must wait ${timeObj.minutes} min(s) ${timeObj.seconds} sec(s) until you are finished!`);
    }
    
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
                    axe: "Stone Axe",
                    weapon: "not equipped",
                    pickdur: 0,
                    axedur: 100,
                    weapondam: 0,
                    copper: [{ore: 0, bar: 0, weapon: false, pick: false, axe: false}],
                    iron: [{ore: 0, bar: 0, weapon: false, pick: false, axe: false}],
                    silver: [{ore: 0, bar: 0, weapon: false, pick: false, axe: false}],
                    nickel: [{ore: 0, bar: 0, weapon: false, pick: false, axe: false}],
                    gold: [{ore: 0, bar: 0, weapon: false, pick: false, axe: false}],
                    platinum: [{ore: 0, bar: 0, weapon: false, pick: false, axe: false}],
                    ruthenium: [{ore: 0, bar: 0, weapon: false, pick: false, axe: false}],
                    titanium: [{ore: 0, bar: 0, weapon: false, pick: false, axe: false}],
                    molybdenum: [{ore: 0, bar: 0, weapon: false, pick: false, axe: false}],
                    rhenium: [{bar: 0, weapon: false, pick: false, axe: false}],
                    iridium: [{bar: 0, weapon: false, pick: false, axe: false}],
                    osmium: [{bar: 0, weapon: false, pick: false, axe: false}],
                    diamond: [{bar: 0, weapon: false, pick: false, axe: false}]
                })
                newInv.save()
                .then(result => console.log(result))
                .catch(err => console.log(err));
                return message.channel.send("**Please try again**");
            }

        if(char.active === false){
        char.active = true;
        char.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
        if(inv.pick === "Stone Pickaxe"){
            let pickspeed = 250;
        }
        else if(inv.pick === "Copper Pickaxe"){
            let pickspeed = 500;
        }
        let minexprnd = Math.floor(Math.random()*4);
        let minexpgain = minexprnd + char.minelvl;
        let nextminelvl = Math.floor(Math.pow(char.minelvl, 2.6));
        let minespeed = 600250 - pickspeed;


        let mineEmbed = new Discord.RichEmbed()
        .setTitle("Mining")
        .setColor("#855e42")
        .setDescription("You are off to the mines for a while!")
        .addField("Pickaxe", `${inv.pick}`);
        message.channel.send(mineEmbed);
        

        let mineGainEmbed = new Discord.RichEmbed()
        .setAuthor("Mining")
        .setTitle("**You are back from mining!**")
        .setColor("#855e42");
            

        setTimeout(() => {
            if(inv.pick === "Stone Pickaxe"){
                let copperrnd = Math.floor(Math.random()*3);
                inv.copper.ore += copperrnd;
                char.minexp += minexpgain;
                mineGainEmbed.addField("Ores Mined", `Copper: +${copperrnd}`, true);
                mineGainEmbed.addField("Mining EXP Gained", `+${minexpgain}`, true);
            }
            message.channel.send(mineGainEmbed);
            char.active = false;
            char.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            inv.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            setTimeout(() => {
                if(char.minexp >= nextminelvl){
                    char.minelvl = char.minelvl + 1;
                    let lvlupEmbed = new Discord.RichEmbed()
                    .setTitle("**Your mining skills leveled up!**")
                    //.setThumbnail("../../images/greenarrow.png")
                    .setColor("#32CD32")
                    .setDescription(`${message.author.username}, you now have a mining skill level of #32CD32${char.minelvl-1}!`);
                    message.channel.send(lvlupEmbed);
                    char.save()
                    .then(result => console.log(result))
                    .catch(err => console.log(err));
                }
            }, 1000);
        }, minespeed);

    
        ratelimitMap.set(message.author.id, Date.now() + minespeed);
    }else{
        return message.reply("You are already doing something.");
    }

    });
});
}

module.exports.help = {
    name: "mine"
}