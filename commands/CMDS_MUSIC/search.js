const discord = require('discord.js');
const utils = require('../../functions/utils.js');
const config = require('../../setting/cfg.js');

module.exports.run = async (bot, message, args) => {
    message.delete();
    let VC = message.member.voiceChannel;
    if (!VC) return utils.noReason(message, `${message.author}, Пожалуйста, присоединь к голосовому каналу! ${config['prefix'][Math.floor(Math.random() * config['prefix'].length)]}play <music/url>`);

    let url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    let pl = /^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/

    let searchString = args.join(' ');
    if (!url || !searchString) return utils.noReason(message, `${message.author}, Пожалуйста, введи название музыки или url! ${config['prefix'][Math.floor(Math.random() * config['prefix'].length)]}play <music/url>`);

    let perms = VC.permissionsFor(message.client.user);
    if (!perms.has('CONNECT')) return utils.noReason(message, `${message.author}, У меня нет разрешения на подключение к голосовым каналам!${config['prefix'][Math.floor(Math.random() * config['prefix'].length)]}play <music/url>`);
    if (!perms.has('SPEAK')) return utils.noReason(message, `${message.author}, У меня нет разрешения говорить по голосовому каналу! ${config['prefix'][Math.floor(Math.random() * config['prefix'].length)]}play <music/url>`);

    if (url.match(pl)) {
        let playlist = await bot.youtube.getPlaylist(url);
        let videos = await playlist.getVideos();

        for (const vid of Object.values(videos)) {
            let video = await bot.youtube.getVideoByID(vid.id)
            await bot.handleVideo(video, message, VC, true)
        }

        return utils.done(message, `🎵 **${playlist.title}** добавлена в очередь.`);
    } else {

        try {
            var video = await bot.youtube.getVideo(url);
        } catch (err) {
            if (err) undefined;
            try {
                var videos = await bot.youtube.searchVideos(searchString, 10);
                let index = 0;

                let embed = new discord.RichEmbed()
                    .setColor('RANDOM')
                    .setThumbnail(bot.user.avatarURL)
                    .setDescription(`**-=- Music Searches -=-**\n${videos.map(video => 
                        `**${++index} -** ${video.title}`).join('\n')}\n\n🎵 Выбери цифру от **1** до **10** в течение **10 секунд**`);

                message.channel.send(embed);

                try {
                    var response = await message.channel.awaitMessages(msg => msg.content > 0 && msg.content < 11, {
                        maxMatches: 1,
                        time: 10000,
                        errors: ['time']
                    });
                } catch (err) {
                    if (err) undefined
                    return utils.noReason(message, `⚠ Время выбора трека вышла! ${config['prefix'][Math.floor(Math.random() * config['prefix'].length)]}search <music>`);
                }
                const videoIndex = parseInt(response.first().content);
                var video = await bot.youtube.getVideoByID(videos[videoIndex - 1].id);
            } catch (err) {
                console.error(err);
                return utils.noReason(message, `${message.author}, видео с аргументом \`${searchString}\` не найдено! ${config['prefix'][Math.floor(Math.random() * config['prefix'].length)]}play <music/url>`);
            }
        }
        return bot.handleVideo(video, message, VC);
    }
};

module.exports.help = {
    name: 'search',
    aliases: []
};