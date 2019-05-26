const Discord = require('discord.js');
const utils = require('../../functions/utils.js');
const Profile = require('../../database/models/profile.js');

module.exports.run = async (bot, message, args, server_name) => {
    if(!['533311944417869824', '541846624335560716'].includes(message.channel.id)){
        let member = message.mentions.members.first()
        let add = bot.isNumeric(args[1]) ? args[1] : 0
        if(add == 0) return utils.noReason(message, '**Введи коректное число!**');
        if(!member) return utils.noReason(message, `**${message.author.username}** | Ты не выбрал пользователя!`);
        let argsUser
        if (member) argsUser = member.user
        Profile.findOne({
            GuildID : message.guild.id,
            userID: message.author.id
        }, (err, out) => {
            if(out.coin < add) return utils.noReason(message, `**${message.author.username}** | Тебе не хватает **${add - out.coin}$**`)
                out.coin = out.coin - add
                Profile.findOne({
                    GuildID : message.guild.id,
                    userID: argsUser.id
                }, (err, out1) => {
                    out1.coin = out1.coin + add
                    out1.save()
                    utils.done(message, `**${message.author.username}** | Ты успешно перевел **${add}$** на баланс **${argsUser.username}**\nНа твоём щету осталось **${out.coin}**`)
                })
            out.save()
        })
    }
}

module.exports.help = {
    name: 'pay',
    aliases: []
};