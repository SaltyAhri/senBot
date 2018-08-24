const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return ("You do not have the permissions to use this command.");
    
    let messageHistory;
    let target;

    if (args[0]) {
        if (!parseInt(args[0])) return message.channel.send("Wrong parameter.");
        messageHistory = await message.channel.fetchMessages({limit: args[0]})
        .catch(console.error);
        if(!messageHistory) return message.channel.send("Error."); 
    } else {
        messageHistory = await message.channel.fetchMessages({limit: 50})
        .catch(console.error);
    }
    
    if(args[1]) {
        target = await message.guild.member(message.mentions.users.first()) || message.guild.member(args[1])
    }

    if(!target) {
        await message.channel.bulkDelete(messageHistory)
        .catch(console.error);
    } else {
        let messageHistoryArray = await messageHistory.array();
        let pruneMessages = [];

        for (i = 0; i < messageHistoryArray.length; ++i) {
            if(messageHistoryArray[i].author.id == target.id) {
                pruneMessages.push(messageHistoryArray[i]);
            }
        }
        
        await message.channel.bulkDelete(pruneMessages)
        .catch(console.error);
    }
}

module.exports.help = {
    name: "prune",
    description: "Prunes messages from this channel. Optionally add an amount. Optionally add a specific user to prune.\nWithout parameters, will prune the last 50 messages by default.",
    type: "mod",
    usage: "`prefix (prune | pr)` `[amount]` `[@user | userID]`"
}

module.exports.conf = {
    aliases: ["pr"]
}