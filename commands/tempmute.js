const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const ms = require("ms");
const botconfig = require("../botconfig.json");

bot.on("ready", async () => {
    console.log("tempmute.js is running");
});

module.exports.run = async(bot, message, args) => {
    
    if(message.author.bot) return;
    if(message.author.type === "dm") return;
    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("User not found.");
    if(tomute.hasPermission("ADMINISTRATOR")) return message.reply("Can't mute them!");
    let mutedrole = message.guild.roles.find(`name`, "muted");

    if(!mutedrole){
        try{
            mutedrole = message.guild.createRole({
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
        }catch(e){
            console.log(e.stack);
        }
    }

    let mutetime = args[1];
    if(!mutetime) return message.reply("Please specify a time.");

    await(tomute.addRole(mutedrole.id));
    message.reply(`<@${mutedrole}> has been muted for ${ms(ms(mutetime))}`);

    setTimeout(function(){
        tomute.removeRole(mutedrole.id);
        message.channel.send(`<@${tomute.id} has been unmuted!`);
    }, ms(mutetime));



}

module.exports.help = {
    name: "tempmute"
}

