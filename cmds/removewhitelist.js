const fs = module.require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return;

    let toRemove = args[0];
    let admin = message.guild.members.get(toRemove);

    if (!bot.whitelist[toRemove]) return message.channel.send("Error: This user is not on the whitelist.")
    
    delete bot.whitelist[toRemove];

    fs.writeFile("./whitelist.json", JSON.stringify(bot.whitelist, null, 4), err => {
        if (err) throw err;
        let embed = new Discord.RichEmbed()
            .setAuthor("Removed " + admin.user.username + "#" + admin.user.discriminator + " from the whitelist!")
            .setColor("#00B6FF");
        message.channel.send(embed);
    });
        
}

module.exports.help = {
    name: "removewhitelist",
    description: "Removes a user from the whitelist.",
    type: "admin",
    usage: "`prefix (rwl)` `(userID)`"
}

module.exports.conf = {
    aliases: ["rwl"]
}