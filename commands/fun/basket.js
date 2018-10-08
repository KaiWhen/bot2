const Discord = require("discord.js");
const userData = require("../../models/userData.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.run = async(bot, message, args) => {
   
    
    message.reply("you just threw a ball at the basket and...");
    setTimeout(2000, function(){
        let rnd = Math.floor(Math.random()*10);
        if(rnd === 6){
            message.reply("scored!");
        }else{
            message.reply("missed! Hard luck!");
        }
    });
    
}

module.exports.help = {
    name: "throw"
}