const Discord = require("discord.js");
const userData = require("../../models/userData.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.run = async(bot, message, args) => {
   

    userData.findOne({
        userID: message.author.id
    }, (err, user) => {
        if(err) console.log(err);
        if(!user){
            const newUser = new userData({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                username: message.author.username,
                money: 500,
                exp: 0,
                lvl: 1,
                prevDaily: "not collected"
            })
            newUser.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            return message.channel.send("**Please try again**");
        }

        let amount = parseInt(args);
        if(!args[1]) amount = 1;
        let check = user.money - amount;
        //if(amount - user.money < 0) return message.reply("**Not enough money!**");
        let resultmoney = amount*2;
        let throwEmbed = new Discord.RichEmbed()
        .setTitle(`🏀 You threw a ball at the basket and...`);
       
        if(check >= 0){
        message.channel.send(throwEmbed);
        setTimeout(function(){
            let rnd = Math.floor(Math.random()*20);
            let basketEmbed = new Discord.RichEmbed();
            
            if(rnd === 6 || rnd === 4 || rnd === 12){
                user.money = user.money + resultmoney;
                basketEmbed.setTitle(`Scored! You just won ${resultmoney}!`);
                basketEmbed.addField("New Balance", user.money);
                user.save()
                .then(result => console.log(result))
                .catch(err => console.log(err));
                return message.channel.send(basketEmbed);
            }else{
                user.money = user.money - amount;
                if(user.money < 0) user.money = 0;
                basketEmbed.setTitle(`Missed! You lost ${amount}! Better luck next time!`);
                basketEmbed.addField("New Balance", user.money);
                user.save()
                .then(result => console.log(result))
                .catch(err => console.log(err));
                return message.channel.send(basketEmbed);
            }
        }, 2500);
    }else{
        return message.reply("**Not enough money!**");
    }
        

    });
    
   
    
}

module.exports.help = {
    name: "throw"
}