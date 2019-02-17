const Discord = require("discord.js");
const mongoose = require("mongoose");


module.exports.run = async(bot, message, args) => {

    let guessgame = {words: [
        {word: "Hello", defn: "used as a greeting or to begin a telephone conversation."},
        {word: "Goodbye", defn: "used to express good wishes when parting or at the end of a conversation."}
    ]
    };

    let wrd = guessgame.words;

    let guessEmbed = new Discord.RichEmbed()
    .setTitle("Guess the word!");

    let wordrnd = Math.random(Math.floor()*wrd.length);
    
    guessEmbed.setDescription(`Definition: ${wrd[wordrnd].defn}`);

    message.channel.send(guessEmbed);

    message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000
    }).then(collected => {

        let guess = collected.first().content;

        if(guess.toUpperCase() === wrd[wordrnd].name){

            message.channel.send(`${message.author.username} guessed the word right!`);

        }
    }).catch(err => {
        message.channel.send("Time's up!");
    })
}

module.exports.help = {
    name: "guess"
}