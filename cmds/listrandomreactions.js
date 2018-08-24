const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let userListEmbed = await new Discord.RichEmbed()
    .setColor(message.guild.member(message.author).highestRole.color)
    .setTimestamp();

    let lrr = Object.keys(bot.randomreactions);

    let emoteList = "\n";
    for(i = 0; i < lrr.length; ++i) {
        emoteList += lrr[i] + "\n";
    }
    
    userListEmbed.addField(`Custom Reactions [${lrr.length}]`, `${emoteList}`);
    message.channel.send(userListEmbed);
        
}

module.exports.help = {
    name: "listrandomreactions",
    description: "Returns a list of random reactions in this server.",
    type: "help",
    usage: "`prefix (lrr)`"
}

module.exports.conf = {
    aliases: ["lrr"]
}