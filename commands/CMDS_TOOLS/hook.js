const Discord = require('discord.js');
const config = require('../../setting/cfg.js');
let p = config['prefix'];
const utils = require('../../functions/utils.js');
const hook = require('../../functions/mudules/hook.js');
const request = require("request");

module.exports.run = async (bot, message, args, server_name) => {
    message.delete();
    if(!args[0]) return hook.hook(message.channel, 'Использование Хуки', `${p[Math.floor(Math.random() * p.length)]}hook <title>, <message>, [HEXcolor], [avatarURL]\n\n**<> - Обязательно.\n[] не Обязательно.**`, `ffd500`, 'https://api.icons8.com/download/bbcbec656c1f5ee1de8b408fc852609f7238ddf7/Color/PNG/512/Logos/webhook-512.png');
    let hookArgs = message.content.slice(p[0].length + 4).split(",");
    hook.hook(message.channel, hookArgs[0], hookArgs[1], hookArgs[2], hookArgs[3]);
}

module.exports.help = {
    name: 'hook',
    aliases: []
};