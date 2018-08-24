module.exports.run = async (bot, message, args) => {
    if (!bot.whitelist[message.member.id]) return message.channel.send("You are not on the right whitelist!");

        let roleName = args.slice(0, args.length-1).join(" ");
        let roleColor = args[args.length-1];
        
        if (roleName == null || roleColor == null) return message.channel.send("You did not specify a color or rolename.");

        let role = message.guild.roles.find(r => r.name === roleName);
        let lowestCustomRole = message.guild.roles.find(r => r.name === "Test");    // Replace test with your lowest custom role.

        if(!role) {
            try {
                role = await message.guild.createRole({
                    name: roleName,
                    color: roleColor,
                    mentionable: true,
                    position: parseInt(lowestCustomRole.position + 1),
                    permissions: []
                });

                return message.channel.send("Created new role " + role);
                
            } catch (e) {
                console.log(e.stack);
            }

        } 
        
        return message.channel.send("Error: A role with that name already exists.");

}

module.exports.help = {
    name: "createrole",
    description: "Creates a new role with the given name and color.",
    type: "whitelist",
    usage: "`prefix (createrole | cr)` `(rolename)` `(color)` "
}

module.exports.conf = {
    aliases: ["cr"]
}