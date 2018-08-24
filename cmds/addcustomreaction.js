const fs = module.require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
        let trigger = args[0];
        let reaction = args[1];
            
        bot.customreactions[trigger] = reaction;

        fs.writeFile("./jsonfiles/customreactions.json", JSON.stringify(bot.customreactions, null, 4), err => {
            if (err) throw err;
            let embed = new Discord.RichEmbed()
                .setAuthor("New Custom Reaction")
                .addField("Trigger", trigger)
                .addField("Reaction", reaction)
                .setColor("#00B6FF");
            message.channel.send(embed);
        });
        
}

module.exports.help = {
    name: "addcustomreaction",
    description: "Adds a custom reaction that triggers upon the specified keyword.",
    type: "admin",
    usage: "`prefix (arr)` `(Trigger)` `(Reaction)`"
}

module.exports.conf = {
    aliases: ["acr"]
}