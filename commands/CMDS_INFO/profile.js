const Discord = require('discord.js');
const config = require('../../setting/cfg.js');
const utils = require('../../functions/utils.js');
const strftime = require('strftime');
const Profile = require('../../database/models/profile.js')

module.exports.run = async (bot, message, args, server_name) => {
    message.delete()
    let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]))
    let argsUser
    if (member) argsUser = member.user
    else argsUser = message.author
    let statuses = {
        online: config['emoji'].online + ' В сети',
        idle: config['emoji'].idle + ' Нет на месте',
        dnd: config['emoji'].dnd + ' Не беспокоить',
        offline: config['emoji'].invis + ' Не в сети'
    }
    let game
    let setGame = statuses[argsUser.presence.status]
    if (!argsUser.presence.game) game = `Cтатус **${setGame}**`
    else if (argsUser.presence.game.type == 0) game = ` Играет в **${argsUser.presence.game.name}**`
    else if (argsUser.presence.game.type == 1) game = ` Стримит [**${argsUser.presence.game.name}**](${argsUser.presence.game.url})`
    else if (argsUser.presence.game.type == 2) game = ` Слушает **${argsUser.presence.game.name}**`
    else if (argsUser.presence.game.type == 3) game = ` Смотрит **${argsUser.presence.game.name}**`

    let day = 1000 * 60 * 60 * 24
    let date1 = new Date(message.createdTimestamp)
    let date2 = new Date(argsUser.createdTimestamp)
    let date3 = new Date(message.guild.member(argsUser).joinedTimestamp)
    let diff1 = Math.round(Math.abs((date1.getTime() - date2.getTime()) / day))
    let diff2 = Math.round(Math.abs((date1.getTime() - date3.getTime()) / day))

    Profile.findOne({
        GuildID : message.guild.id,
        userID : argsUser.id
    },(err, out) => {
        if(!out) return utils.noReason(message, `**${argsUser.username} не зарегистрирован в базе данных!**`)

        let verifi = out.verified == true ? config['emoji'].verified : ''
        let partner = out.partner == true ? config['emoji'].partners : ''
        let dev = out.dev == true ? '🛠 ' : ''
        let presenc = new Array(verifi, partner, dev)

        let nxtLvlXp = out.lvl * 300;
        let difference = nxtLvlXp - out.xp;
        let LVL = out.xp / nxtLvlXp * 100
        let warn = out.warn < 1 ? 'Нету!' : out.warn < 5 ? out.warn + ' / 5 До мута!' : out.warn + ' / 10 До бана!'
        let bar = bot.bar(out.xp, nxtLvlXp)['%'];

        let embed = new Discord.RichEmbed()
            .setTitle(presenc.join('') + ' Профель пользователя ' + argsUser.username)
            .setDescription(game)
            .addField('UserID: ', `**${argsUser.id}**`, true)
            .addField('Множитель xp: ', `**SOON**`, true)
            .addField('Денег: ', `**${out.coin}$**`, true)
            .addField(`Уровень ${out.lvl} (${bar == 'Infinity' ? '0' : bar}%)`, `**${out.xp} xp | ${difference} xp до ${out.lvl + 1} lvl**\n${bot.bar(out.xp, nxtLvlXp)['bar']}`, true)
            .addField('Предупреждений: ', `**${warn}**`, true)
            .addField('Роли: ', `**${message.guild.member(argsUser).roles.filter(r => r.id != message.guild.id).map(role => role.name).join(', ')}**` || '**Не имеет**', true)
            .addField('Дата регистарции: ', `**${strftime('%d.%m.%Y в %H:%M', new Date(argsUser.createdTimestamp))}\n(${diff1} дн. назад)**`, true)
            .addField('Дата вступления: ', `**${strftime('%d.%m.%Y в %H:%M', new Date(message.guild.member(argsUser).joinedTimestamp))}\n(${diff2} дн. назад)**`, true)
            .setColor(message.guild.member(argsUser).displayHexColor)
            .setTimestamp()
            .setThumbnail(argsUser.avatarURL)
            .setFooter(server_name)
        message.channel.send(embed)
    });
}

module.exports.help = {
    name: 'profile',
    aliases: []
};

// **${out.lvl} LVL (${Math.round(LVL, -1)}%)\n${out.xp} XP\n${difference} XP до ${out.lvl + 1} LVL**