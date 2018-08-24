module.exports.run = async (bot, message, args) => {
    if (!bot.whitelist[message.member.id]) return message.channel.send("You are not on the right whitelist!");

        let oldName = args[0].split(";").slice(0).join(" ");  
        let roleName = args.slice(1).join(" ");

        if (oldName == null || roleName == null) return message.channel.send("You did not specify the current name or a new name.");
        if (!message.guild.roles.find(r => r.name === oldName)) return message.channel.send("The role you want to change does not exist.");
        
        let role = message.guild.roles.find(r => r.name === oldName);

        role.setName(roleName);

        return message.channel.send("Changed the name of " + oldName + " to " + roleName);

}

module.exports.help = {
    name: "changerolename",
    description: "Changes the name of the given role. If the old role name has spaces you need to replace them with `;`.",
    type: "whitelist",
    usage: "`prefix crn` `(rolename | role;name)` `(new name)` "
}

module.exports.conf = {
    aliases: ["crn"]
}