const Discord = require("discord.js");
const charData = require("../../models/game.js");
const invData = require("../../models/invData.js");
const mongoose = require("mongoose");
const ms = require("parse-ms");
const ratelimitMap = new Map();

module.exports.run = async(bot, message, args) => {


    // const ratelimit = ratelimitMap.get(message.author.id)
    // if(ratelimit !== null && (Date.now() - ratelimit) < 0 ){
    //     let timeObj = ms((ratelimit - Date.now()));
    //     return message.reply(`You must wait ${timeObj.minutes} min(s) ${timeObj.seconds} sec(s) until you are finished!`);
    // }

    let ore = args[0];
    let amnt = args[1];
    
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
                active: false,
                smelt: false,
                smelttime: 0,
                smeltstamp: 0
            })
            newChar.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            return message.channel.send("**Please try again.**");
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

            if(!ore) return message.reply("Please enter a valid ore name, e.g. copper");
            if(isNaN(amnt)) return message.reply("Please enter a number for the amount.");

        if(char.smelt === false){
        char.smelt = true;
        char.smeltstamp = Date.now();
        char.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
        if(ore.toLowerCase() === "copper"){
            if((inv.copper.ore - amnt) < 0) return message.reply("You don't have enough copper ore.");
            char.smelttime = 30000*parseInt(amnt);
            inv.copper.ore -= parseInt(amnt);
            inv.save()
            .catch(err => console.log(err));
            char.save()
            .catch(err => console.log(err));
        }
        else if(ore.toLowerCase() === "iron"){
            if((inv.iron.ore - amnt) < 0) return message.reply("You don't have enough iron ore.");
            char.smelttime = 50000*parseInt(amnt);
            inv.iron.ore -= parseInt(amnt);
            inv.save()
            .catch(err => console.log(err));
            char.save()
            .catch(err => console.log(err));
        }
        else if(ore.toLowerCase() === "silver"){
            if((inv.silver.ore - amnt) < 0) return message.reply("You don't have enough silver ore.");
            char.smelttime = 25000*parseInt(amnt);
            inv.silver.ore -= parseInt(amnt);
            inv.save()
            .catch(err => console.log(err));
            char.save()
            .catch(err => console.log(err));
        }
        else if(ore.toLowerCase() === "nickel"){
            if((inv.nickel.ore - amnt) < 0) return message.reply("You don't have enough nickel ore.");
            char.smelttime = 46000*parseInt(amnt);
            inv.nickel.ore -= parseInt(amnt);
            inv.save()
            .catch(err => console.log(err));
            char.save()
            .catch(err => console.log(err));
        }
        else if(ore.toLowerCase() === "gold"){
            if((inv.gold.ore - amnt) < 0) return message.reply("You don't have enough gold ore.");
            char.smelttime = 29000*parseInt(amnt);
            inv.gold.ore -= parseInt(amnt);
            inv.save()
            .catch(err => console.log(err));
            char.save()
            .catch(err => console.log(err));
        }
        else if(ore.toLowerCase() === "platinum"){
            if((inv.platinum.ore - amnt) < 0) return message.reply("You don't have enough platinum ore.");
            char.smelttime = 60000*parseInt(amnt);
            inv.platinum.ore -= parseInt(amnt);
            inv.save()
            .catch(err => console.log(err));
            char.save()
            .catch(err => console.log(err));
        }
        else if(ore.toLowerCase() === "ruthenium"){
            if((inv.ruthenium.ore - amnt) < 0) return message.reply("You don't have enough ruthenium ore.");
            char.smelttime = 46000*parseInt(amnt);
            inv.ruthenium.ore -= parseInt(amnt);
            inv.save()
            .catch(err => console.log(err));
            char.save()
            .catch(err => console.log(err));
        }
        else if(ore.toLowerCase() === "titanium"){
            if((inv.titanium.ore - amnt) < 0) return message.reply("You don't have enough titanium ore.");
            char.smelttime = 57000*parseInt(amnt);
            inv.titanium.ore -= parseInt(amnt);
            inv.save()
            .catch(err => console.log(err));
            char.save()
            .catch(err => console.log(err));
        }
        
        let nextlvl = Math.ceil(Math.pow(char.charlvl, 2.5));


        let smeltEmbed = new Discord.RichEmbed()
        .setTitle("Furnace")
        .setColor("#C0C0C0")
        .setThumbnail(message.author.displayAvatarURL)
        .setDescription(`Smelting ${ore} ore!`)
        .addField("Amount", `${amnt}`);
        message.channel.send(smeltEmbed);
        

        let smeltGainEmbed = new Discord.RichEmbed()
        .setAuthor("Furnace")
        .setTitle("**You are finished smelting!**")
        .setColor("#C0C0C0");
            

        setTimeout(() => {
            if(ore.toLowerCase() === "copper"){
                let xprnd = Math.floor(Math.random()*1)+4;
                inv.copper.bar += parseInt(amnt);
                char.charxp += xprnd;
                smeltGainEmbed.addField("Ores Smelted", `${amnt} Copper Ore`, true);
                smeltGainEmbed.addField("Bars Obtained", `+${amnt} Copper Bars`, true);
                smeltGainEmbed.addField("EXP Gained", `+${xprnd} EXP`, true);
                inv.save()
                .catch(err => console.log(err));
                char.save()
                .catch(err => console.log(err));
            }
            else if(ore.toLowerCase() === "iron"){
                let xprnd = Math.floor(Math.random()*2)+5;
                inv.iron.bar += parseInt(amnt);
                char.charxp += xprnd;
                smeltGainEmbed.addField("Ores Smelted", `${amnt} Iron Ore`, true);
                smeltGainEmbed.addField("Bars Obtained", `+${amnt} Iron Bars`, true);
                smeltGainEmbed.addField("EXP Gained", `+${xprnd} EXP`, true);
                inv.save()
                .catch(err => console.log(err));
                char.save()
                .catch(err => console.log(err));
            }
            else if(ore.toLowerCase() === "silver"){
                let xprnd = Math.floor(Math.random()*1)+5;
                inv.silver.bar += parseInt(amnt);
                char.charxp += xprnd;
                smeltGainEmbed.addField("Ores Smelted", `${amnt} Silver Ore`, true);
                smeltGainEmbed.addField("Bars Obtained", `+${amnt} Silver Bars`, true);
                smeltGainEmbed.addField("EXP Gained", `+${xprnd} EXP`, true);
                inv.save()
                .catch(err => console.log(err));
                char.save()
                .catch(err => console.log(err));
            }
            else if(ore.toLowerCase() === "nickel"){
                let xprnd = Math.floor(Math.random()*2)+4;
                inv.nickel.bar += parseInt(amnt);
                char.charxp += xprnd;
                smeltGainEmbed.addField("Ores Smelted", `${amnt} Nickel Ore`, true);
                smeltGainEmbed.addField("Bars Obtained", `+${amnt} Nickel Bars`, true);
                smeltGainEmbed.addField("EXP Gained", `+${xprnd} EXP`, true);
                inv.save()
                .catch(err => console.log(err));
                char.save()
                .catch(err => console.log(err));
            }
            else if(ore.toLowerCase() === "gold"){
                let xprnd = Math.floor(Math.random()*2)+7;
                inv.gold.bar += parseInt(amnt);
                char.charxp += xprnd;
                smeltGainEmbed.addField("Ores Smelted", `${amnt} Gold Ore`, true);
                smeltGainEmbed.addField("Bars Obtained", `+${amnt} Gold Bars`, true);
                smeltGainEmbed.addField("EXP Gained", `+${xprnd} EXP`, true);
                inv.save()
                .catch(err => console.log(err));
                char.save()
                .catch(err => console.log(err));
            }
            else if(ore.toLowerCase() === "platinum"){
                let xprnd = Math.floor(Math.random()*3)+7;
                inv.platinum.bar += parseInt(amnt);
                char.charxp += xprnd;
                smeltGainEmbed.addField("Ores Smelted", `${amnt} Platinum Ore`, true);
                smeltGainEmbed.addField("Bars Obtained", `+${amnt} Platinum Bars`, true);
                smeltGainEmbed.addField("EXP Gained", `+${xprnd} EXP`, true);
                inv.save()
                .catch(err => console.log(err));
                char.save()
                .catch(err => console.log(err));
            }
            else if(ore.toLowerCase() === "ruthenium"){
                let xprnd = Math.floor(Math.random()*3)+6;
                inv.ruthenium.bar += parseInt(amnt);
                char.charxp += xprnd;
                smeltGainEmbed.addField("Ores Smelted", `${amnt} Ruthenium Ore`, true);
                smeltGainEmbed.addField("Bars Obtained", `+${amnt} Ruthenium Bars`, true);
                smeltGainEmbed.addField("EXP Gained", `+${xprnd} EXP`, true);
                inv.save()
                .catch(err => console.log(err));
                char.save()
                .catch(err => console.log(err));
            }
            else if(ore.toLowerCase() === "titanium"){
                let xprnd = Math.floor(Math.random()*4)+7;
                inv.titanium.bar += parseInt(amnt);
                char.charxp += xprnd;
                smeltGainEmbed.addField("Ores Smelted", `${amnt} Titanium Ore`, true);
                smeltGainEmbed.addField("Bars Obtained", `+${amnt} Titanium Bars`, true);
                smeltGainEmbed.addField("EXP Gained", `+${xprnd} EXP`, true);
                inv.save()
                .catch(err => console.log(err));
                char.save()
                .catch(err => console.log(err));
            }
            message.channel.send(smeltGainEmbed);
            char.smelt = false;
            char.smelttime = 0;
            char.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            setTimeout(() => {
                if(char.charxp >= nextlvl){
                    char.charlvl = char.charlvl + 1;
                    let lvlupEmbed = new Discord.RichEmbed()
                    .setTitle("**Your character leveled up!**")
                    //.setThumbnail("../../images/greenarrow.png")
                    .setColor("#32CD32")
                    .setDescription(`${message.author.username}, you are now level ${char.charlvl-1}!`);
                    message.channel.send(lvlupEmbed);
                    char.save()
                    .then(result => console.log(result))
                    .catch(err => console.log(err));
                }
            }, 1000);
        }, char.smelttime);

    
        //ratelimitMap.set(message.author.id, Date.now() + 5000);
    }else{
        return message.reply("You are already smelting something.");
    }

    });
});
}

module.exports.help = {
    name: "smelt"
}