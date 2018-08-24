const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!bot.whitelist[message.member.id]) return message.channel.send("You are not on the right whitelist!");

        let target = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if (!target) return message.channel.send("You did not specify a user mention or ID!");

        let roleName = args.slice(1).join(" ");

        let role = message.guild.roles.find(r => r.name === roleName);

        if (!role) return message.channel.send("There is no role with that name in this server.");

        if (role.position >= message.member.highestRole.position) return message.channel.send("You cannot assign this role to a user.");

        await target.addRole(role);
        let embed = new Discord.RichEmbed()
                    .addField("Added role: ", "Assigned " + role.name + " to " + target.user.username + "!")
                    .setColor(message.guild.member(message.author).highestRole.color);
        message.channel.send(embed);
}

module.exports.help = {
    name: "assignrole",
    description: "Assigns a role to the specified user.",
    type: "whitelist",
    usage: "`prefix sr` `(@user | userID)` `(rolename)` "
}

module.exports.conf = {
    aliases: ["sr"]
}