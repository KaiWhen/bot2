const Discord = require("discord.js");
const userData = require("../../models/userData.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.run = async(bot, message, args) => {
   
    
    message.reply("you just threw a ball at the basket and...");
    setTimeout(function(){
        let rnd = Math.floor(Math.random()*5)+6;
        if(rnd === 6){
            return message.reply("scored!");
        }else{
            return message.reply("missed! Hard luck!");
        }
    }, 2000);
    
}

module.exports.help = {
    name: "throw"
}