const discord = require('discord.js');
const utils = require('../../functions/utils.js');

module.exports.run = async (bot, message, args) => {
    message.delete();
    let queue = bot.queue.get(message.guild.id);
    if (!queue) return utils.noReason(message, '⚠ Музыка не играет.');

    let embed = new discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(bot.user.avatarURL)
        .setDescription(`**-=- Music Queue -=-**\n${queue.musics.map(music => 
            `**-** ${music.title}`).join('\n')}\n\n🎵 **В настоящее момент играет:** ${queue.musics[0].title}`);
    message.channel.send(embed);
};

module.exports.help = {
    name: 'queue',
    aliases: ['list', 'musiclist', 'songlist']
}