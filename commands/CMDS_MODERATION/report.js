const Discord = require('discord.js');
const config = require('../../setting/cfg.js');
const utils = require('../../functions/utils.js');
const request = require("request")


module.exports.run = async (bot, message, args, server_name) => {
    message.delete();
    if(!args[0]) return utils.noReason(message, "👤 Укажите пользователя !")
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return utils.noReason(message, "👤 Неудолось найти данного пользователя !")
    let rreason = args.join(" ").slice(22) || "Причина не указанна!"

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("**Reports**")
    .setColor("#b70000")
    .addField("Пользователь", `${message.author}`, true)
    .addField("Жалоба на", `${rUser}`, true)
    .addField("Канал", message.channel, true)
    .addField("Причина", rreason, true)
    .setFooter("Время")
    .setTimestamp();

    let reportschannel = message.guild.channels.find(`name`, "команды");
    if(!reportschannel) return utils.noReason(message, `Создай канал **команды**`)

    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);
}

module.exports.help = {
    name: 'report',
    aliases: []
};