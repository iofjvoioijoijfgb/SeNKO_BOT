const Discord = require('discord.js');
const config = require('../../setting/cfg.js');
const utils = require('../../functions/utils.js');
const commands = require('../../setting/commands.js')
const emoji = config['emoji']

module.exports.run = async (bot, message, args, server_name) => {
    message.delete();
    let pp = config['prefix'][Math.round(Math.random() * config['prefix'].length)];
    let prefix = pp == undefined ? config['prefix'][0] : pp;

    if (isNaN(parseInt(args[1]))) args[1] = 1
    const page = parseInt(args[1]);
    if (!args[0] || !['m', 'f', 'g', 'o', 't', 's', 'i', 'e'].includes(args[0].toLowerCase())) {
        const embed = new Discord.RichEmbed()
            .setTitle('Помощь')
            .setColor('ffd500')
            .setDescription('Вы не указали модуль. Существющие модули:\n\n**1. g - GAME\n2. e - ECONOMY\n3. f - FUN\n4. i - INFO\n5. m - MODERATION\n6. s - MUSIC\n7. o - OTHER\n8. t - TOOLS**\n\nПримеры: ' + prefix + 'help m, ' + prefix + 'help s 2')
            .setFooter(server_name)
            .setTimestamp();
        return message.channel.send({embed}).then(msg => msg.delete(30 * 1000))
    }
    let category = args[0][0].toLowerCase();
    let categories = [];
    let tempDesc = '';
    let cmd = 0;
    let params = '`[...]` — Необязательный параметр\n`<...>` — Обязательный параметр\n`||` — Aргумент или\n\n';
    for (let i in commands) if (!categories.includes(commands[i].type)) categories.push(commands[i].category);
    const embed = new Discord.RichEmbed()
    .setColor('ffd500')
    .setTimestamp()
    for (let i in commands) if (category === commands[i].type) {
        cmd++;
        if (page === 1 && cmd <= 10) {
            tempDesc += `**${prefix}${commands[i].name}**`;
            for (let a in commands[i].args) tempDesc += ' `' + commands[i].args[a] + '` ';
            if (commands[i].perm) tempDesc += '(Требуется право: `' + commands[i].perm + '`)';
            tempDesc += ` — ${commands[i].desc}\n`;
            embed.setDescription(params + tempDesc);
            continue;
        }
        if (cmd >= page * 10 - 9 && page > 1) {
            tempDesc += `**${prefix}${commands[i].name}**`;
            for (let a in commands[i].args) {
                if (!commands[i].args) continue;
                tempDesc += ' `' + commands[i].args[a] + '` ';
            }
            if (commands[i].perm) tempDesc += '(Требется право: `' + commands[i].perm + '`)';
            tempDesc += ` — ${commands[i].desc}\n`;
            embed.setDescription(params + tempDesc);
        }
        embed.setFooter('Страница ' + page + '/' + Math.ceil(cmd / 10))
    }
    if (cmd < page * 10 - 10 && page > 1 || page <= 0) return utils.noReason(message, 'Такой страницы не существует');

    if (category === 'g')   category = '**игры**';
    if (category === 'e')   category = '**экономика**';
    if (category === 'f')   category = '**развлечения**';
    if (category === 'i')   category = '**информация**';
    if (category === 'm')   category = '**модерация**';
    if (category === 's')   category = '**музыка**';
    if (category === 'o')   category = '**разное**';
    if (category === 't')   category = '**инструменты**';
    
    embed.setTitle('Команды модуля ' + category) ;
    message.channel.send({embed}).then(msg => msg.delete(30 * 1000))
};

module.exports.help = {
    name: 'help',
    aliases: []
};