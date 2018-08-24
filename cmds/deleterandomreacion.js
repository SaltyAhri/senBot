const fs = module.require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
        let toRemove = args[0];
            
        if (!bot.randomreactions[toRemove]) return message.channel.send("There is no reation with the specified trigger.");

        fs.writeFile("./jsonfiles/randomreactions.json", JSON.stringify(bot.randomreactions, null, 4), err => {
            if (err) throw err;
            let embed = new Discord.RichEmbed()
                .setAuthor("Removed Reaction")
                .addField("Trigger", toRemove)
                .setColor("#00B6FF");
            message.channel.send(embed);
        });
        
}

module.exports.help = {
    name: "deleterandom",
    description: "Deletes a custom reaction from the list.",
    type: "admin",
    usage: "`prefix (drr)` `(Trigger)`"
}

module.exports.conf = {
    aliases: ["drr"]
}