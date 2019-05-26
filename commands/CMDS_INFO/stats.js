const Discord = require('discord.js');
const config = require('../../setting/cfg.js');
let load = config['emoji'].loading
const utils = require('../../functions/utils.js');
const request = require("request")
const os = require('os')

module.exports.run = async (bot, message, args, server_name) => {
    let ping = message.createdTimestamp - Date.now(), ping1 = Date.now() - message.createdTimestamp
    let filter = (ping < 0) ? ping1 : ping
    message.delete()
    let used = process.memoryUsage().rss / 1024 / 1024;
    let RAM = Math.round(used * 100) / 100
    let RAMP = RAM / 6144 * 100
    let embed = new Discord.RichEmbed()
        .setTitle(load + "Stats")
        .addField("• Platform", os.platform(), true)
        .addField("• Hostname", os.hostname(), true)
        .addField("• OS_TYPE", os.type(), true)
        .addField("• CPU", `\`\`\`${os.cpus()[0].model}\`\`\``, true)
        .addField("• RAM" + ` (${Math.round(RAMP, -1)}%)`, `${RAM} / 6144 МБ`, true)
        .addField("• PING", filter, true)
        .addField("• API", bot.pings[0], true) 
        .addField("• ARCH", os.arch(), true)
        .addField("• Library", `discord.js **11.4.2**`, true)
        .addField("• UPTIME", `\`\`\`${Math.round(bot.uptime / (1000 * 60 * 60 * 24))} дня(дней), ${Math.round(bot.uptime / (1000 * 60 * 60))} часа(ов), ${Math.round(bot.uptime / (1000 * 60)) % 60} минут, ${Math.round(bot.uptime / 1000) % 60} секунд\`\`\``, true)
        .addField(`• C_CORE. На данный момент обробатыватся ${bot.ccore.length} ${bot.declOfNum(bot.ccore.length, ['команду', 'команды', 'команд'])}`, `\`\`\`fix\n${bot.ccore.join('; ')}\`\`\``)
        .setFooter(server_name)
        .setTimestamp()
        .setColor("#ffd500");
    message.channel.send(embed)
}

module.exports.help = {
    name: 'stats',
    aliases: []
};