module.exports.run = async (bot, message, args) => {
    if (!bot.whitelist[message.member.id]) return message.channel.send("You are not on the right whitelist!");

        let roleName = args.slice(0, args.length-1).join(" ");
        let roleColor = args[args.length-1];

        if (roleName == null || roleColor == null) return message.channel.send("You did not specify a color or rolename.");
        if (!message.guild.roles.find(r => r.name === roleName)) return message.channel.send("The role you want to change does not exist.");

        let role = message.guild.roles.find(r => r.name === roleName);

        role.setColor(roleColor);

        return message.channel.send("Changed the color of  " + role);

}

module.exports.help = {
    name: "changerolecolor",
    description: "Changes the color of specified role to the given hexcolor.",
    type: "whitelist",
    usage: "`prefix crc` `(rolename)` `(color)`"
}

module.exports.conf = {
    aliases: ["crc"]
}