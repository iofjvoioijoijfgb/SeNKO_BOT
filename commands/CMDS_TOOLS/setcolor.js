const Discord = require('discord.js');
const utils = require('../../functions/utils.js');

const hexreg = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

module.exports.run = async (bot, message, args, server_name) => {
	if (!args[0]) return utils.noPerms(message, 'Вы не указали цвет'); 
    if (!args[0].match(hexreg)) return utils.noPerms(message, 'Вы указали неправильную структуру цвета');
    if (message.member.roles.find(role => role.name.match(/^🎨 ║ #([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/))) {
        message.member.removeRole(message.member.roles.find(role => {role.name.match(/^🎨 ║ #([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)})).catch();
    }
    message.guild.createRole({
        "permissions" : 0,
        "name" : `🎨 ║ ${args[0]}`, 
        "color" : args[0]
    }).then((role) => {
        message.member.addRole(role);
        let embed = new Discord.RichEmbed()
        	.setAuthor('Твой цвет изменен на ' + `${args[0]}`, message.author.avatarURL)
        	.setColor(`${args[0]}`)
        message.channel.send(embed).then(m => m.delete(10000))
    });
}