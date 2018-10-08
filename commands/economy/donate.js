const Discord = require("discord.js");
const userData = require("../../models/userData.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.run = async(bot, message, args) => {
    
    let donation = args[1];
    let todonate = message.mentions.members.first();
    
    userData.findOne({
        userID: message.author.id,
        //serverID: message.guild.id,
    }, (err, authorMoney) => {
        if(err) console.log(err);
        if(!authorMoney){
            const newUser = new userData({
                _id: mongoose.Types.ObjectId(),
                 userID: message.author.id,
                 username: message.author.username,
                 //serverID: message.guild.id,
                money: 500,
               prevDaily: "not collected"
            })
           newUser.save()
             .then(result => console.log(result))
             .catch(err => console.log(err));
        }

        userData.findOne({
            userID: todonate.id,
            //serverID: message.guild.id,
        }, (err, payedMoney) => {
            if(err) console.log(err);
            if(!payedMoney) {
                const newUser = new userData({
                    _id: mongoose.Types.ObjectId(),
                     userID: todonate.id,
                     username: todonate.username,
                     //serverID: message.guild.id,
                    money: 500,
                   prevDaily: "not collected"
                })
               newUser.save()
                 .then(result => console.log(result))
                 .catch(err => console.log(err));
            }

            let donator = authorMoney.money;
            let receiver = payedMoney.money;

            if(donator < donation) return message.reply("Not enough money!");
            
            donator = donator - parseInt(donation);
            receiver = receiver + parseInt(donation);
        
            let donateEmbed = new Discord.RichEmbed()
            .setTitle(`**${message.author.username} has successfully donated ${donation} to ${todonate.username}**`);
            
            message.channel.send(donateEmbed);

            authorMoney.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            payedMoney.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
        });
        
    });
    


}

module.exports.help = {
    name: "donate"
}