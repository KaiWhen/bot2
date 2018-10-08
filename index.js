const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({disableEveryone: true});
const rps = require("./rps.js");
const botinfo = require("./botinfo.js");
const fs = require("fs");
const moment = require("moment");
bot.commands = new Discord.Collection();
const mongoose = require('mongoose');
const userData = require("./models/userData");
const Schema = mongoose.Schema;
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB);
//mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function load(dir){

    fs.readdir(dir, (err, files) => {

    if(err) console.log(err);
    
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Could not find commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        delete require.cache[require.resolve(`${dir}${f}`)];
        let props = require(`${dir}${f}`);
        console.log(`${f} loaded yay!`);
        bot.commands.set(props.help.name, props);
    });
});
}

load("./commands/fun/");
load("./commands/moderation/");
load("./commands/economy/");

bot.on("ready", async () => {
    console.log(`${bot.user.username} is running`);
    bot.user.setActivity("with u");
  });


bot.on("message", async message => {

    
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let prefix = botconfig.prefix;
    let args = messageArray.slice(1);
    

if(message.content.startsWith(prefix)){
     let commandfile = bot.commands.get(cmd.slice(prefix.length));
     if(commandfile) commandfile.run(bot, message, args);
 }else{
     if(message.member.user.bot) return;
    userData.findOne({
         userID: message.author.id,
        //serverID: message.guild.id
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
            return;
         }else{
                
            user.money = user.money;
             
        }

   
    let nextlvl = Math.ceil(Math.pow(user.lvl, 3));
    if(user.lvl > 0 && user.lvl <= 4){
        let exprnd = Math.ceil(Math.random()*1)+2;
        user.exp = user.exp + exprnd;
    }
    else if(user.lvl > 4 && user.lvl <= 6){
        let exprnd = Math.ceil(Math.random()*4)+6;
        user.exp = user.exp + exprnd;
    }
    else if(user.lvl > 6 && user.lvl <= 10){
        let exprnd = Math.ceil(Math.random()*8)+12;
        user.exp = user.exp + exprnd;
    }
    
    if(user.exp >= nextlvl){
        user.lvl = user.lvl + 1;
        let lvlupEmbed = new Discord.RichEmbed()
        .setTitle("**Level up!**")
        .setColor("#00FF00")
        .setDescription(`**${message.author.username}, you are now level ${user.lvl}!**`);
        message.channel.send(lvlupEmbed);
    }
    
    user.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
    return;
            
     });
}



// if(message.content != "uisadfhuisadif"){
//     userData.findOne({
//     userID: message.author.id
// }, (err, xp) => {
//     if(err) console.log(err);
//     if(!xp){
//         return message.channel.send("Error");
//     }
//     let currentexp = xp.exp;
//     let currentlvl = xp.lvl;
//     let nextlvl = Math.ceil(Math.pow(xp.lvl,3));
//     if(currentlvl > 0 && currentlvl <= 5){
//         let exprnd = Math.ceil(Math.random()*5)+3;
//     }
//     else if(currentlvl > 5 && currentlvl <= 10){
//         let exprnd = Math.ceil(Math.random()*5)+10;
//     }
//     else if(currentlvl > 10 && currentlvl <= 13){
//         let exprnd = Math.ceil(Math.random()*8)+20;
//     }
//     currentexp = xp.exp + exprnd;
//     if(currentexp >= nextlvl){
//         currentlvl = currentlvl + 1;
//         let lvlupEmbed = new Discord.RichEmbed()
//         .setTitle("**Level up!**")
//         .setColor("#00FF00")
//         .setDescription(`**${message.author.username}, are now level ${currentlvl}!**`)
//         message.channel.send(lvlupEmbed);
//     }
    
//     xp.save()
//     .then(result => console.log(result))
//     .catch(err => console.log(err));
    
// });
// }
    

});




bot.login(process.env.BOT_TOKEN);

//https://discordapp.com/oauth2/authorize?client_id=496756423901052931&scope=bot
