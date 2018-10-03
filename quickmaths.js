const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log("quickmaths.js is running")
});

var n;
var aract = false;
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


bot.on("message", async message => {

    function timeo(){
        let arithAct = false;
    }

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

    function arRnd(){
        arithRnd = Math.floor(Math.random()*10);
        aract = true;
    }

    function arAns(){
        if(arithRnd == 0 && arithAct == true){
            message.channel.send("**" + arithE[arithRnd] + "**");
            n++;
            aract = false;
            if(message.content = eval(arithE[0])){
                message.channel.send("**Correct! Next question!**");
                aract = true;
            }
        }
    }
    

    if(cmd === `${prefix}arithE`){
        arithAct = true;
        timeout = false;
        aract = false;
        n = 0;
        
        arRnd();
        while(n < 10 && aract == true){
            arAns();
        }
           
            
    }


    if(message.content === 'gei'){
        message.channel.send("no u");
    }
});

//bot.login(botconfig.token);
