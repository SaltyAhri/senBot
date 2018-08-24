const fs = module.require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have manage message permissions!");
        
        let toUnmute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if (!toUnmute) return message.channel.send("You did not specify a user mention or ID!");

        let userrole = message.guild.roles.find(r => r.name === "Muted");

        if (!userrole || !toUnmute.roles.has(userrole.id)) return message.channel.send("This user is not muted");

        await toUnmute.removeRole(userrole);
        delete bot.mutes[toUnmute.id];

        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
            if (err) throw err;
            let unmuteEmbed = new Discord.RichEmbed()
                .setAuthor("User unmuted", toUnmute.user.displayAvatarURL)
                .setColor(message.guild.member(message.author).highestRole.color || "#FF0000")
                .addField("Username", `${toUnmute.user.username}#${toUnmute.user.discriminator}`, true)
                .addField("ID", `${toUnmute.user.id}`, true)        
                .setTimestamp();

            message.channel.send(unmuteEmbed);
        });
}

module.exports.help = {
    name: "unmute",
    description: "Unmutes a user.",
    type: "whitelist",
    usage: "`prefix (unmute | um)` `(@user | userID)`"
}

module.exports.conf = {
    aliases: ["um"]
}