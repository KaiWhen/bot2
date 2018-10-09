const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const ms = require("ms");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mutereport = require("../../models/mongotest.js");

module.exports.run = async(bot, message, args) => {
    
    if(message.author.bot) return;
    if(message.author.type === "dm") return;
    
    if(!author.hasPermission("ADMINISTRATOR")) return message.reply("**You do not have permission to do that!**");
    let tomute = message.mentions.members.first();
    if(!tomute) return message.reply("User not found.");
    if(tomute.hasPermission("ADMINISTRATOR")) return message.reply("Can't mute them!");
    let mutedrole = message.guild.roles.find(r => r.name === "muted");
    let reason = args.slice(2).join(" ");
    if(!reason) return message.reply("There must be a reason...right?");


    const mReport = new mutereport({
        _id: mongoose.Types.ObjectId(),
        username: tomute.user.username,
        userID: tomute.user.id,
        reason: reason,
        mUser: message.author.username,
        mID: message.author.id,
        Time: message.createdAt
    });

    mReport.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));

    message.channel.send("mute report has been saved to the database");
    

    if(!mutedrole){
        try{
            mutedrole = await message.guild.createRole( {
                name: "muted",
                color: "#000000",
                permissions: []
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(mutedrole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(err){
            console.log(err.stack);
        }
    }

    let mutetime = args[1];
    if(!mutetime) return message.reply("Please specify a time.");

    

    try{
        await tomute.send(`You have been muted for ${mutetime} for reason: ${reason}`);
    }catch(e){
        message.channel.send(`A user has been muted...but their DMs are locked. They have been muted for ${mutetime}`);
    }

    let muteEmbed = new Discord.RichEmbed()
    .setDescription(`Mute executed by ${message.author}`)
    .setColor("#FF0000")
    .addField("Muted User", tomute)
    .addField("Muted in", message.channel)
    .addField("Time", message.createdAt)
    .addField("Length", mutetime)
    .addField("Reason", reason);

    let incidentchannel = message.guild.channels.find(c => c.name === "incidents");
    if(!incidentchannel) return message.reply("Please make an incidents channel!");
    incidentchannel.send(muteEmbed);
    
    message.delete().catch(O_o=>{});

    await(tomute.addRole(mutedrole));
    //message.reply(`${mutedrole} has been muted for ${ms(ms(mutetime))}`);

    setTimeout(function(){
        tomute.removeRole(mutedrole);
        message.channel.send(`${tomute} has been unmuted!`);
    }, ms(mutetime));



}

module.exports.help = {
    name: "tempmute"
}

