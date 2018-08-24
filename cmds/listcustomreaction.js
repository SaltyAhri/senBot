const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let userListEmbed = await new Discord.RichEmbed()
    .setColor(message.guild.member(message.author).highestRole.color)
    .setTimestamp();

    let lcr = Object.keys(bot.customreactions);

    let emoteList = "\n";
    for(i = 0; i < lcr.length; ++i) {
        emoteList += lcr[i] + "\n";
    }
    
    userListEmbed.addField(`Custom Reactions [${lcr.length}]`, `${emoteList}`);
    message.channel.send(userListEmbed);
        
}

module.exports.help = {
    name: "listcustomreactions",
    description: "Returns a list custom reactions in this server.",
    type: "help",
    usage: "`prefix (lcr)`"
}

module.exports.conf = {
    aliases: ["lcr"]
}