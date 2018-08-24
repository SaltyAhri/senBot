const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let userListEmbed = await new Discord.RichEmbed()
    .setColor(message.guild.member(message.author).highestRole.color)
    .setTimestamp();

    let wl = Object.keys(bot.whitelist);

    let userList = "\n";
    for(i = 0; i < wl.length; ++i) {
        userList += wl[i] + "\n";
    }
    
    userListEmbed.addField(`Users [${wl.length}]`, `\`\`\`${userList}\`\`\``);
    message.channel.send(userListEmbed);
        
}

module.exports.help = {
    name: "listwhitelist",
    description: "Returns a list of users with admin permissions.",
    type: "help",
    usage: "`prefix (lwl)`"
}

module.exports.conf = {
    aliases: ["lwl"]
}