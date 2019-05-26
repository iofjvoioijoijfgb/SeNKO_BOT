const Discord = require('discord.js');
const config = require('../../setting/cfg.js');
const utils = require('../../functions/utils.js');
const request = require("request")

module.exports.run = async (bot, message, args, server_name) => {
    if (!['533311944417869824', '541846624335560716'].includes(message.channel.id)) {
        if(!args[0]) return utils.noReason(message, "👤 Укажите пользователя !")
        message.delete().catch(O_o => {});
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return utils.noReason(message, "👤 Неудолось найти данного пользователя !")
        let bReason = args.join(" ").slice(22) || "Причина не указанна!"
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return utils.errorr(message, "**Требуется разрешение** `MANAGE_MESSAGES`")
        //if(bUser.hasPermission("MANAGE_MESSAGES")) return utils.noW(message, "👤 Такого пользователя нельзя за банить !");
    
        let embed = new Discord.RichEmbed()
        .setDescription("**Ban**")
        .setColor("#b70000")
        .addField("Модератор", `<@${message.author.id}>`, true)
        .addField("Пользоватерь", `${bUser}`, true)
        .addField("Канал", message.channel, true)
        .addField("Причина", bReason, true)
        .setFooter("Время")
        .setTimestamp();
    
        let incidentchannel = message.guild.channels.find(`name`, "команды");
        if(!incidentchannel) return utils.noReason(message, `Создай канал **команды**`)
    
        message.guild.member(bUser).ban(bReason);
        incidentchannel.send(embed);
    } else {
        message.delete();
        utils.noReason(message, `Сорри **${message.author.username}** но эта команда тут не работает!`)
    }
}

module.exports.help = {
    name: 'ban',
    aliases: []
};