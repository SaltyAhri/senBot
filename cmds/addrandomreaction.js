const fs = module.require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
        let trigger = args[0];
        let first = args[1];
        let second = args[2];
            
        bot.randomreactions[trigger] = [first, second];

        fs.writeFile("./jsonfiles/randomreactions.json", JSON.stringify(bot.randomreactions, null, 4), err => {
            if (err) throw err;
            let embed = new Discord.RichEmbed()
                .setAuthor("New Random Reaction")
                .addField("Trigger", trigger)
                .addField("Reaction", first + " or " + second)
                .setColor("#00B6FF");
            message.channel.send(embed);
        });
        
}

module.exports.help = {
    name: "addrandomreaction",
    description: "Adds a custom reaction that has a 50:50 chance to trigger one of two reactions upon the specified keyword.",
    type: "admin",
    usage: "`prefix (arr)` `(Trigger)` `(Reaction1)` `(Reaction2)`"
}

module.exports.conf = {
    aliases: ["arr"]
}