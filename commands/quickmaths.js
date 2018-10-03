const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log("quickmaths.js is running")
});

var arithAct = false;
var arithRnd;
var timeout;
var ans;
var ansn;
var arithE = new Array();
arithE[0] = "2 + 2";
arithE[1] = "4 - 1";
arithE[2] = "8 + 14";
arithE[3] = "12 + 6";
arithE[4] = "3 + 15";
arithE[5] = "23 - 6";
arithE[6] = "8 - 3";
arithE[7] = "6 + 9";
arithE[8] = "13 - 7";
arithE[9] = "5 + 11";

function timeo(){
    message.channel.send("you suck");
}

bot.on("message", async message => {

if(message.author.bot) return;
if(message.channel.type === "dm") return;

let prefix = botconfig.prefix;
let messageArray = message.content.split(" ");
let cmd = messageArray[0];
let args = messageArray.slice(1);

    if(cmd === `${prefix}evaltest`){
        message.channel.send(eval(arithE[0]));
    }
        

    if(cmd === `${prefix}quickmaths`){
        let mathsEmbed = new Discord.RichEmbed()
        .setTitle("**QUICK MATHS**")
        .addField("Arithmetic", "Easy\n(Command - arithE)")

        message.channel.send(mathsEmbed);

        return;
    }

    

    if(cmd === `${prefix}arithE`){
        arithAct = true;
        timeout = false;
        let n = 0;
           // if(arithAct === true && n === 0){
                rnd = Math.floor(Math.random()*10);
                message.channel.send("**" + arithE[rnd] + "**");
                ans = eval(arithE[rnd]);
                ansn = ans.toString();
                //message.channel.send(ansn);
                setTimeout(timeo, 10000);
            
                if(message.content === ansn){
                    return message.channel.send("**Correct! Next question!**");
                    n++;
                }
                else if(message.content === "you suck"){
                    message.channel.send("**WRONG! YOU SUCK.**");
                    message.channel.send("You failed! Better luck next time.");
                    
                }
           // }
            
    }


    if(message.content === 'gei'){
        message.channel.send("no u");
    }
});

bot.login(botconfig.token);