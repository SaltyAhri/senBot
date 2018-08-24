const fs = module.require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!bot.whitelist[message.member.id]) return message.channel.send("You are not on the right whitelist!");

        let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if (!toMute) return message.channel.send("You did not specify a user mention or ID!");

        if (toMute.id === message.author.id) return message.channel.send("You cannot mute yourself.");
        if (toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("You cannot mute a person with the same or higher role than you.");

        let role = message.guild.roles.find(r => r.name === "Muted");
        if(!role) {
            try {
                role = await message.guild.createRole({
                    name: "Muted",
                    permissions: []
                });
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (e) {
                console.log(e.stack);
            }
        }

        if (toMute.roles.has(role.id)) return message.channel.send("This user is already muted");

        bot.mutes[toMute.id] = {
            guild: message.guild.id,
            time: Date.now() + parseInt(args[1]) * 1000 * 60
        }

        fs.writeFile("./jsonfiles/mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
            if (err) throw err;
            let muteEmbed = new Discord.RichEmbed()
            .setAuthor(args[1] == null ? "User muted" : "User muted for " + args[1] + " minutes", toMute.user.displayAvatarURL)
            .setColor(message.guild.member(message.author).highestRole.color)
            .addField("Username", `${toMute.user.username}#${toMute.user.discriminator}`, true)
            .addField("ID", `${toMute.user.id}`, true)        
            .setTimestamp();

            message.channel.send(muteEmbed);
        });

        await toMute.addRole(role);
}

module.exports.help = {
    name: "mute",
    description: "Mutes a user.",
    type: "whitelist",
    usage: "`prefix (mute)` `(@user | userID)` `(minutes)`"
}

module.exports.conf = {
    aliases: ["m"]
}