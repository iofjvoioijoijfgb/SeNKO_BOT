const Discord = require('discord.js');
const config = require('../../setting/cfg.js');
const utils = require('../../functions/utils.js');

module.exports.run = async (bot, message, args, server_name) => {
    let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]))
    let argsUser
    if (member) argsUser = member.user
    else argsUser = message.author

    if (argsUser.id == bot.user.id) {
        message.delete();
        message.channel.send('Неа! :3')
    } else {
        const embed = new Discord.RichEmbed()
            .setTitle(`Аватарка пользователя ${argsUser.username}`)
            .setImage(argsUser.avatarURL)
            .setFooter(server_name)
            .setColor("ffd500")
            .setTimestamp();
        message.channel.send({embed});
        message.delete();
    }
}

module.exports.help = {
    name: 'avatar',
    aliases: []
};