const utils = require('../../functions/utils.js');
const config = require('../../setting/cfg.js');

module.exports.run = async (bot, message, args) => {
	message.delete();
    let queue = bot.queue.get(message.guild.id);
    if (!message.member.voiceChannel) return utils.noReason(message, `${message.author}, Пожалуйста, присоединись к голосовому каналу, чтобы выполнить эту команду! ${config['prefix'][Math.floor(Math.random() * config['prefix'].length)]}stop`);
    if (!queue) return utils.noReason(message, '⚠ Музыка не играет.');

    queue.musics = [];
    queue.connection.dispatcher.end();
};

module.exports.help = {
    name: 'stop',
    aliases: ['leave']
};