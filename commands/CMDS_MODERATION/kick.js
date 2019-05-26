const Discord = require('discord.js');
const config = require('../../setting/cfg.js');
const utils = require('../../functions/utils.js');
const request = require("request")

module.exports.run = async (bot, message, args, server_name) => {
    if (!['533311944417869824', '541846624335560716'].includes(message.channel.id)) {
        if(!args[0]) return utils.noReason(message, "👤 Укажите пользователя !")
        message.delete()
        let kUser = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
        if(!kUser) return utils.noReason(message, "👤 Неудолось найти данного пользователя !")
        let kReason = args.join(" ").slice(22) || "Причина не указанна!"
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return utils.noPerms(message, "**Требуется разрешение** `MANAGE_MESSAGES`")
        //if(kUser.hasPermission("MANAGE_MESSAGES")) return utils.noW(message, "⚠ Такого пользователя нельзя кикнуть !");

        let embed = new Discord.RichEmbed()
        .setTitle("**Kick**")
        .setColor("#ff0000")
        .addField("Модератор", `${message.author}`, true)
        .addField("В канале", `${message.channel}`, true)
        .addField("Причина", `${kReason}`, true)
        .setFooter("Время")
        .setTimestamp();

        let incidentchannel = message.guild.channels.find(`name`, "команды");
        if(!incidentchannel) return utils.noReason(message, `Создай канал **команды**`)
    
        message.guild.member(kUser).kick(kReason);
        incidentchannel.send(embed);
    } else {
        message.delete();
        utils.noReason(message, `Сорри **${message.author.username}** но эта команда тут не работает!`)
    }
}

module.exports.help = {
    name: 'kick',
    aliases: []
};