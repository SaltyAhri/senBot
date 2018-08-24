const fs = module.require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
        let toRemove = args[0];
        
        if (!bot.customreactions[toRemove]) return message.channel.send("There is no reation with the specified trigger.");
        
        delete bot.customreactions[toRemove];

        fs.writeFile("./jsonfiles/customreactions.json", JSON.stringify(bot.customreactions, null, 4), err => {
            if (err) throw err;
            let embed = new Discord.RichEmbed()
                .setAuthor("Removed Reaction")
                .addField("Trigger", toRemove)
                .setColor("#00B6FF");
            message.channel.send(embed);
        });
        
}

module.exports.help = {
    name: "deletecustom",
    description: "Deletes a custom reaction from the list.",
    type: "admin",
    usage: "`prefix (dcr)` `(Trigger)`"
}

module.exports.conf = {
    aliases: ["dcr"]
}