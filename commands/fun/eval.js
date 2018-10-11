const Discord = require("discord.js");
const math = require("mathjs");

module.exports.run = async(bot, message, args) => {

    if(!args[0]) return message.channel.send("**Please input a maths calculation**");

    let response;
    try{
        response = math.eval(args.join(" "));
    }catch(err){
        message.channel.send("**Please input a valid maths calculation**");
    }

    const respEmbed = new Discord.RichEmbed()
    .setTitle("Maths Calculation")
    .addField("Input", `\`\`\`${args.join(" ")}\`\`\``)
    .addField("Output", `\`\`\`${response}\`\`\``);

    message.channel.send(respEmbed);
    
}

module.exports.help = {
    name: "eval"
}