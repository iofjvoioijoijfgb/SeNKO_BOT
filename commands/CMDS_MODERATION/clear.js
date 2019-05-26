const Discord = require('discord.js');
const config = require('../../setting/cfg.js');
const utils = require('../../functions/utils.js');
const request = require("request")

module.exports.run = async (bot, message, args, server_name) => {
    let count_all = 0
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return utils.noPerms(message, "**Что-бы использовать clear у вас должно быть право** `MANAGE_MESSAGES`")
    const user = message.mentions.users.first();
    const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
    if (!amount) return utils.noReason(message, '**Укажите участника и количество сообщений, либо укажите количество сообщений не больше 100**')
    if (!amount && !user) return utils.noReason(message, '**Укажите участника и количество сообщений, либо укажите количество сообщений не больше 100**')
    if (amount > 100) return utils.noReason(message, '**Укажите участника и количество сообщений, либо укажите количество сообщений не больше 100**')
    message.channel.fetchMessages({limit: amount}).then((messages) => {
        count_all = count_all + messages.size;
        if (user) {
            const filterBy = user ? user.id : bot.user.id;
            messages = messages.filter(m => m.author.id === filterBy).array().slice(0, count_all);
        }
        if(user) { 
            utils.done(message, `Было удалено **${count_all} ${bot.declOfNum(count_all, ['сообщение', 'сообщения', 'сообщений'])}** участника ${user}`)
        }
        if(!user) { 
            utils.done(message, `Было успешно удалено **${count_all} ${bot.declOfNum(count_all, ['сообщение', 'сообщения', 'сообщений'])}**`)
        }
        message.channel.bulkDelete(messages).catch(err => utils.noReason(message, err))
    })
}

module.exports.help = {
    name: 'clear',
    aliases: []
};