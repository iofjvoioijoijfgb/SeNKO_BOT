const Discord = require('discord.js')
const shell = require('executive')
const config = require('../../setting/cfg.js');
const utils = require('../../functions/utils.js');

let load = config['emoji'].loading

module.exports.run = (bot, message, args) => {
    message.delete();
    owners = new Set();
    owners.add('410838014990876672');
    if(!owners.has(message.author.id)) return utils.noPerms(message, 'Требуется доступ по ID!')
    let arg = args.join(" ");
    if(!arg) return error("Не указан код выполнения");
    message.channel.send(load + `Oбработка команды`).then(mym =>{
        shell(arg, (e, r, b) => {
            if(e) return mym.edit(new Discord.RichEmbed().setColor('RED').setDescription(e));
            message.channel.send(r, {split: "\n", code: 'bash'});
            mym.delete()
        });
    })
}

module.exports.help = {
    name: 'shell',
    aliases: []
};