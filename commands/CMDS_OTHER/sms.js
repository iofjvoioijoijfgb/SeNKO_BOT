const Discord = require('discord.js');
const utils = require('../../functions/utils.js');
const request = require("request")

module.exports.run = async (bot, message, args, server_name) => {
    message.delete();
    let user = message.mentions.members.first();
    if (!user) {
        return utils.noReason(message, "👤 Укажите получателя !")
    }
    const sendMessage = args.join(" ");
    let embed = new Discord.RichEmbed()
        .setTitle("📧 Новое сообщение")
        .addField("👤 Пользователь", `${message.author}`, true)
        .addField("📬 Прислал сообщение", `**${sendMessage.replace(user, '')}**`, true)
        .setColor("ffd500")
        .setFooter(server_name)
        .setTimestamp();
    user.send({embed}).catch((e) => (
        utils.errorr(message, e)
    ))
}

module.exports.help = {
    name: 'sms',
    aliases: []
};