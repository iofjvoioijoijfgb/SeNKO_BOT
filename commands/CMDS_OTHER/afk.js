const Discord = require('discord.js');
const config = require('../../setting/cfg.js');
const utils = require('../../functions/utils.js');
const request = require("request")

module.exports.run = async (bot, message, args, server_name) => {
    message.delete();
    let reason = args.join(' ') ? args.join(' ') : 'Не указанно';
    let afklist = bot.afk.get(message.author.id);
    if (!afklist) {
        let construct = {
            id: message.author.id,
            username: message.author.username,
            reason: reason
        };

        let embed = new Discord.RichEmbed()
            .setTitle(`**${message.author.username}** отошел, скоро вернётся!`)
            .setDescription('Причина: ' +  reason)
            .setColor('#ffd500')
            .setThumbnail('http://cs9.pikabu.ru/images/big_size_comm_an/2017-01_4/1484607602192974027.gif')
        message.channel.send(embed).then(msg => {
            msg.react('💤')
        })
        bot.afk.set(message.author.id, construct);
    }
}

module.exports.help = {
    name: 'afk',
    aliases: []
};