let tet         = new Set();
const Discord   = require('discord.js')
const config    = require('../setting/cfg.js');
const utils     = require('../functions/utils.js');
const modules   = require('../functions/mudules/afk.js');
const Profile   = require('../database/models/profile.js');
const economy   = require('../functions/mudules/economy.js');
const warns     = require('../functions/mudules/warns.js');
const db        = require('../database/db.js')

module.exports = async (bot, message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    modules.afkSyS(message, bot);
    warns.CAPS(message, Profile);
    warns.INVT(message, Profile);
    economy.ECONOMY(message, Profile);

    db.no_connect(config['ConnectDB'].ObjectDB(), Discord, message)

    let prefixes = config['prefix'];
    let prefix = false;
    prefixes.forEach(prefix_ => {
        if (message.content.startsWith(prefix_)) {
            prefix = prefix_;
        }
    })

    tet.forEach(tat => {
        if (message.content.startsWith(tat)) {
            prefix = tat;
        }
    })
    if (prefix === false) return;
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    let command;

    let server_name = "🔥 | Requested by " + message.author.username

    if (!message.content.startsWith(prefix)) return;
    if (bot.commands.has(cmd)) {
        command = bot.commands.get(cmd);
    } else if (bot.aliases.has(cmd)) {
        command = bot.commands.get(bot.aliases.get(cmd));
    }
    if (config['CNF'] == true) {
        try {
            command.run(bot, message, args, server_name)
        } catch (err) {
            if (err) utils.noReason(message, `Команды \`${cmd}\` не существует!`, `${prefix}help`)
        }
    } else {
        try {
            command.run(bot, message, args, server_name)
        } catch (err) {
            if (err) return undefined;
        }
    }
}