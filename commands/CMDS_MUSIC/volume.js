const utils = require('../../functions/utils.js');
const config = require('../../setting/cfg.js');

module.exports.run = async (bot, message, args) => {
    message.delete();
    let queue = bot.queue.get(message.guild.id);
    if (!queue) return utils.noReason(message, '⚠ Музыка не играет.');
    
    if (!args[0]) return utils.done(message, `🎵 Данная громкасть: **${queue.volume}/100**`);
    if (isNaN(args[0])) return utils.noReason(message, `${message.author}, Пожалуйста, введи громкость от 0 до 100! ${config['prefix'][Math.floor(Math.random() * config['prefix'].length)]}volume <volume>`);
    if (args[0] < 0 || args[0] > 100) return utils.noReason(message, `${message.author}, Пожалуйста, введи громкость от 0 до 100! ${config['prefix'][Math.floor(Math.random() * config['prefix'].length)]}volume <volume>`);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return utils.done(message, `🎵 Громкость теперь установлена на **${queue.volume}/100**`);
};

module.exports.help = {
    name: 'volume',
    aliases: ['vol']
};