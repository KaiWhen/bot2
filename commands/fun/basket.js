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
        let resultmoney = amount*2;
        let throwEmbed = new Discord.RichEmbed()
        .setTitle(`You threw a ball at the basket and... 🏀`);
        message.channel.send(throwEmbed);
        setTimeout(function(){
            let rnd = Math.floor(Math.random()*10);
            let basketEmbed = new Discord.RichEmbed();
            
            if(rnd === 6 || rnd === 4){
                user.money = user.money + resultmoney;
                basketEmbed.setTitle(`Scored! You just won ${resultmoney}!`);
                basketEmbed.addField("New Balance", user.money);
                return message.channel.send(basketEmbed);
            }else{
                user.money = user.money - resultmoney;
                basketEmbed.setTitle(`Missed! You lost ${resultmoney}! Better luck next time!`);
                return message.channel.send(basketEmbed);
            }
        }, 2500);

    });
    
   
    
}

module.exports.help = {
    name: "throw"
}