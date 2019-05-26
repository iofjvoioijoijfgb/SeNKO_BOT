const Discord = require('discord.js');
const config = require('../../setting/cfg.js');
const utils = require('../../functions/utils.js');
const request = require("request")

module.exports.run = async (bot, message, args, server_name) => {
    message.delete();
    let user = message.author;
    message.channel.send('Загрузка...').then(msg => {
    const urls = [
        "https://discordemoji.com/assets/emoji/ingPC.gif",
        "https://discordemoji.com/assets/emoji/Feels3DMan.gif",
        "https://discordemoji.com/assets/emoji/BestMates.gif"
    ];
    let embed = new Discord.RichEmbed()
        .setTitle(`**Тест бота**`)
        .setImage(urls[Math.floor(Math.random() * urls.length)])
        .setColor('RANDOM')
        .setTimestamp()
        .setFooter(server_name);
        msg.edit(message.channel.send({embed}).then(function(message) {
            message.react("✅")
        }))
    });
}

module.exports.help = {
    name: 'test',
    aliases: []
};