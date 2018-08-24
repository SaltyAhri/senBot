const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!bot.whitelist[message.member.id]) return message.channel.send("You are not on the right whitelist!");

        let target = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[1]);
        if (!target) return message.channel.send("You did not specify a user mention or ID!");

        let role = message.guild.roles.find(r => r.name === args[0]);
        if (!role) return message.channel.send("There is no role with that name in this server.");

        if (role.position >= message.member.highestRole.position) return message.channel.send("You cannot remove this role from the user.");

        await target.removeRole(role);
        let embed = new Discord.RichEmbed()
                    .addField("Removed role: ", "Removed " + role.name + " from " + target.user.username + "!")
                    .setColor(message.guild.member(message.author).highestRole.color);
        message.channel.send(embed);
}

module.exports.help = {
    name: "removerole",
    description: "Removes the specified role from the user.",
    type: "whitelist",
    usage: "`prefix (rr)` `(role)` `(@user | userID)`"
}

module.exports.conf = {
    aliases: ["rr"]
}