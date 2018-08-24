const fs = module.require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
        let id = args[0];
        let admin = message.guild.members.get(id);
        
        bot.whitelist[id] = admin.user.username;

        fs.writeFile("./jsonfiles/whitelist.json", JSON.stringify(bot.whitelist, null, 4), err => {
            if (err) throw err;
            let embed = new Discord.RichEmbed()
                .setAuthor("Added " + admin.user.username + "#" + admin.user.discriminator + " to the whitelist!")
                .setColor("#00B6FF");
            message.channel.send(embed);
        });
        
}

module.exports.help = {
    name: "addwhitelist",
    description: "Adds a user to the whitelist.",
    type: "admin",
    usage: "`prefix (awl)` `(userID)`"
}

module.exports.conf = {
    aliases: ["awl"]
}