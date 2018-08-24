const Discord = require("discord.js");
const botSettings = require('./botsettings.json');
const prefix = botSettings.prefix;
const fs = require("fs");

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
bot.mutes = require("./jsonfiles/mutes.json");
bot.customreactions = require("./jsonfiles/customreactions.json");
bot.randomreactions = require("./jsonfiles/randomreactions.json");
bot.whitelist = require("./jsonfiles/whitelist.json");
bot.prefix = prefix;
bot.aliases = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
    if(err) console.log(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
        if(!props.conf || !props.conf.aliases) return;
        props.conf.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        });
    });
});

bot.on("ready", () => {
    console.log(`Bot is ready!`);
    bot.user.setActivity("Pouting with sen sen");

    bot.setInterval(() => {
        for(let i in bot.mutes) {
            let time = bot.mutes[i].time;
            let guildId = bot.mutes[i].guild;
            let guild = bot.guilds.get(guildId);
            let member = guild.members.get(i);
            let mutedRole = guild.roles.find(r => r.name === "Muted");
            if(!mutedRole) continue;

            if(Date.now() > time) {
                console.log(`${i} is now able to be unmuted!`);

                member.removeRole(mutedRole);
                delete bot.mutes[i];

                fs.writeFile("./jsonfiles/mutes.json", JSON.stringify(bot.mutes), err => {
                    if (err) throw err;
                    console.log(`I have unmuted ${member.user.tag}`);
                });
            }
        }
    }, 5000)

});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return message.channel.send("<:senPout:393651309208928257>");

    if (bot.randomreactions[message.content]) {
        let rng = Math.round(Math.random());
        let reaction = bot.randomreactions[message.content];
        message.channel.send(reaction[rng]);

    } else if (bot.customreactions[message.content]) message.channel.send(bot.customreactions[message.content]);

    if (message.content.toLowerCase().includes("umaru")) {
        let n = 0;
        
        for (let i = 0; i < message.content.length; i++) {
            if ('0123456789'.indexOf(message.content.substring(i,i+1))) n++;
        } 
        
        if (n >= 18) message.delete();
    }

    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLocaleLowerCase();
    let args = messageArray.slice(1);

    if (!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(prefix.length)));
    if (cmd) cmd.run(bot, message, args);

});

bot.on('error', console.error);

bot.on("guildMemberAdd", (member) => {
    let role = message.guild.roles.find(r => r.name === "Servant");
    member.addRole(role)
  });

bot.login(botSettings.token);
