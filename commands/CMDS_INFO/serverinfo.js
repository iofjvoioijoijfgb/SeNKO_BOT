const Discord = require('discord.js');
const config = require('../../setting/cfg.js');
const utils = require('../../functions/utils.js');
const request = require("request")

module.exports.run = async (bot, message, args, server_name) => {
    message.delete();
    let verifilv = ['**Отсутствует**', '**Низкий**', '**Средний**', '**Высокий**', '**Очень высокий**'];
    let embed = new Discord.RichEmbed()
        .setTitle('Информация о сервере')
        .addField('Владелец', `**${message.guild.owner}**`, true)
        .addField('ID', `**${message.guild.id}**`, true)
        .addField('Регион', `**${message.guild.region}**`, true)
        .addField('Участники', `**${message.guild.presences.size} в сети\n${message.guild.memberCount} всего**`, true)
        .addField('Каналы', `**${message.guild.channels.filter(c => c.type == 'text').size} текстовых\n${message.guild.channels.filter(c => c.type == 'voice').size} голосовых**`, true)
        .addField('Уровень проверки', verifilv[message.guild.verificationLevel], true)
        .addField('AFK канал', message.channel.guild.afkChannel !== null ? message.channel.guild.afkChannel : '**Нету.**', true)
        .addField('Высшая роль', `**${message.channel.guild.roles.sort((a, b) => a.position - b.position || a.id - b.id).last().name}**`, true)
        .addField('Имя сервера', `**${message.channel.guild.name}**`, true)
        .addField('Сокращеное имя сервера', `**${message.channel.guild.nameAcronym}**`, true)
        .addField('Ролей', `**${message.guild.roles.size}**`, true)
        .addField('Смайликов', `**${message.guild.emojis.size}**`, true)
        .setFooter('Сервер создан')
        .setTimestamp(new Date(message.guild.createdTimestamp))
        .setColor("#ffd500");
    message.channel.send(embed);
}

module.exports.help = {
    name: 'serverinfo',
    aliases: []
};