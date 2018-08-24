const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    const p = await message.channel.send("Pinging...");

    pingEmbed = await new Discord.RichEmbed()
    .setAuthor(`${message.author.username}#${message.author.discriminator}`)
    .setTitle(`${p.createdTimestamp - message.createdTimestamp}ms.`)
    .setColor("#00B6FF")
    .setTimestamp();

    await p.delete();
    await message.channel.send(pingEmbed);
}

module.exports.help = {
    name: "ping",
    description: "Checks the bot's latency of communicating with Discord's bot API.",
    type: "help",
    usage: "`prefix (ping)`"
}

module.exports.conf = {
    aliases: ["p"]
}