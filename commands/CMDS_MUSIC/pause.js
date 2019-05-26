const utils = require('../../functions/utils.js');

module.exports.run = async (bot, message, args) => {
	message.delete();
    let queue = bot.queue.get(message.guild.id);
    
    if (queue && queue.playing) {
        queue.playing = false;
        queue.connection.dispatcher.pause();
        return utils.noReason(message, `🎵 Музыка уже остановилась`);
    }

    return utils.noReason(message, '⚠ Музыка не играет.');
    
};

module.exports.help = {
    name: 'pause',
    aliases: []
};