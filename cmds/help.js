const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    if(!args[0]) {
        let listMod, listUtil, listHelp, listWhitelist, listAdmin;
        listMod = listUtil = listHelp = listWhitelist = listAdmin = "\n";

        await bot.commands.forEach(e => {
            switch (e.help.type) {
                case "admin":
                    listAdmin += `${e.help.name}`.padEnd(12);
                    listAdmin += `[${e.conf.aliases}]\n`;
                    break;
                case "mod": 
                    listMod += `${e.help.name}`.padEnd(12);
                    listMod += `[${e.conf.aliases}]\n`;
                    break;
                case "util":
                    listUtil += `${e.help.name}`.padEnd(12);
                    listUtil += `[${e.conf.aliases}]\n`;
                    break;
                case "help":
                    listHelp += `${e.help.name}`.padEnd(12);
                    listHelp += `[${e.conf.aliases}]\n`;
                    break;
                case "whitelist":
                    listWhitelist += `${e.help.name}`.padEnd(12);
                    listWhitelist += `[${e.conf.aliases}]\n`;
                    break;
                default:
                    break;
            }
        });    

        let helpListEmbed = await new Discord.RichEmbed()
        .setAuthor("Available commands")
        .setColor(message.guild.member(message.author).highestRole.color || "#00B6FF")
        .addField("Admin", `\`\`\`ini${listAdmin}\`\`\``, true)
        .addField("Moderation", `\`\`\`ini${listMod}\`\`\``, true)
        .addField("WhiteList", `\`\`\`ini${listWhitelist}\`\`\``, true)
        .addField("Utility", `\`\`\`ini${listUtil}\`\`\``, true)
        .addField("Help", `\`\`\`ini${listHelp}\`\`\``, true)
        .addBlankField(true)
        .addBlankField(true)
        .setTimestamp();

        return message.channel.send(helpListEmbed);
               
    } else {
        let command = await bot.commands.get(args[0]) || bot.commands.get(bot.aliases.get(args[0]));
        if(!command) return message.channel.send("There is no such command.");

        let helpCommandEmbed = await new Discord.RichEmbed()
        .setAuthor(``)
        .setColor(message.guild.member(message.author).highestRole.color || "#00B6FF")
        .addField(`${command.help.name}`, `${command.help.description}`)
        .addField("Usage", `${command.help.usage}`.replace(/prefix /g, `${bot.prefix}`))
        .setTimestamp();

        return message.channel.send(helpCommandEmbed)
    }
}

module.exports.help = {
    name: "help",
    description: "Returns a list of all available commands. Optionally add a command name or alias to return individual command help.",
    type: "help",
    usage: "`prefix (help | h)` `[command | alias]`"
}

module.exports.conf = {
    aliases: ["h"]
}