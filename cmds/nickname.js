module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_NICKNAMES")) return;

    let roleToRename = args[0];
    let name = args[1];
    let guild = message.guild;
    let role = message.guild.roles.find(r => r.name === roleToRename);
    guild.members.forEach(function(guildMember) {
        if (guildMember.roles.has(role.id)) {
            if (name == null) {
                guildMember.setNickname("");
            } else {
                guildMember.setNickname(name);
            }
        }
     })
}

module.exports.help = {
    name: "nick",
    description: "Gives all users with the specified role the specified nickname.",
    type: "mod",
    usage: "`prefix (nick)` `(rolename)` `(name)`"
}

module.exports.conf = {
    aliases: ["nick"]
}