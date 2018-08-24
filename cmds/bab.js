module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":x: You do not have the permissions to use this command.");
    //Get the mentioned user, return if there is none.
        let toBab = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if (!toBab) return message.channel.send(":x: You did not specify a user mention or ID!");

        if (toBab.id === message.author.id) return message.channel.send(":x: You cannot bab yourself.");
        if (toBab.highestRole.position >= message.member.highestRole.position) return message.channel.send(":x: You cannot bab a person with the same or higher role than you.");

        message.channel.send(":white_check_mark: Successfully babbed " +  toBab.user.username + "#" + toBab.user.discriminator);
}

module.exports.help = {
    name: "bab",
    description: "Babs a user.",
    type: "mod",
    usage: "`prefix bab` `(@user | userID)`"
}

module.exports.conf = {
    aliases: ["bab"]
}