const utils = require('../../functions/utils.js');
const config = require('../../setting/cfg.js');

module.exports.run = async (bot, message, args) => {
    message.delete();
    let queue = bot.queue.get(message.guild.id);
    let votes = bot.votes.get(message.guild.id);
    if (!message.member.voiceChannel) return utils.noReason(message, `${message.author}, Пожалуйста, присоединь к голосовому каналу, чтобы выполнить эту команду! ${config['prefix'][Math.floor(Math.random() * config['prefix'].length)]}skip`);
    if (!queue) return utils.noReason('⚠ No musics are being played.');

    if (!message.member.hasPermission('ADMINISTRATOR')) {
        if (votes.voters.includes(message.author.id)) return utils.noReason(message, `⚠ ${message.author}, вы уже проголосовали! **${votes.votes}/3** голосов!`, `${config['prefix'][Math.floor(Math.random() * config['prefix'].length)]}skip`);

        votes.votes++
        votes.voters.push(message.author.id);
        utils.noReason(message, `🎵 ${message.author}, ты уже проголосовали за то, чтобы пропустить! **${votes.votes}/3** голосов!`);

        if (votes.votes > 3) return queue.connection.dispatcher.end();
    } else return queue.connection.dispatcher.end();
};

module.exports.help = {
    name: 'skip',
    aliases: []
};