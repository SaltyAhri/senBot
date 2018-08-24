module.exports.run = async (bot, message, args) => {
    let msg = await message.channel.send("Generating server icon ...");
    
    await message.channel.send({files: [
        {
            attachment: message.guild.iconURL,
            name: "icon.png"
        }
    ]});

    msg.delete();
}

module.exports.help = {
    name: "icon",
    description: "Returns the icon of the server.",
    type: "util",
    usage: "`prefix (icon)`"
}

module.exports.conf = {
    aliases: ["i"]
}