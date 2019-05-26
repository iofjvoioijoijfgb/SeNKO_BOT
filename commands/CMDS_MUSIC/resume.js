const utils = require('../../functions/utils.js');

module.exports.run = async (bot, message, args) => {
	message.delete();
    let queue = bot.queue.get(message.guild.id);
    
    if (queue && !queue.playing) {
        queue.playing = true;
        queue.connection.dispatcher.resume();
        return utils.done(message, `🎵 Музыка возобновлена.`);
    }
    
    return utils.noReason(message, '⚠ Музыка не играет.');
};

module.exports.help = {
    name: 'resume',
    aliases: []
};