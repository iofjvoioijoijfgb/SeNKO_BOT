const Discord = require('discord.js');
const config = require('../../setting/cfg.js');
let p = config['prefix'];
const utils = require('../../functions/utils.js');
const request = require("request");

module.exports.run = async (bot, message, args, server_name) => {
    if(!args[0]) return utils.noReason(message, "📝 Укажите сообщение !")
    message.delete()
    let say = message.content.slice((p + 'say').length);
    message.channel.send(say);
}

module.exports.help = {
    name: 'say',
    aliases: []
};