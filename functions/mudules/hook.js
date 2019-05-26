const Discord = require('discord.js')

module.exports.hook = function(channel, title, message, color, avatar){
    if(!channel) return message.channel.send('Канал не указан.');
    if(!title) return message.channel.send('Название не указано.');
    if(!message) return message.channel.send('Сообщение не указано.');
    if(!color) color = 'ffd500';
    if(!avatar) avatar = 'https://api.icons8.com/download/bbcbec656c1f5ee1de8b408fc852609f7238ddf7/Color/PNG/512/Logos/webhook-512.png';

    color = color.replace(/\s/g, '');
    avatar = avatar.replace(/\s/g, '');

    channel.fetchWebhooks().then(webhook => {
        let foundhook = webhook.find('name', 'Webhook');

        if(!foundhook){
            channel.createWebhook('Webhook', 'https://api.icons8.com/download/bbcbec656c1f5ee1de8b408fc852609f7238ddf7/Color/PNG/512/Logos/webhook-512.png')
            .then(webhook => {
                webhook.send('', {
                    "username" : title,
                    "avatarURL" : avatar,
                    "embeds" : [{
                        "color" : parseInt(`0x${color}`),
                        "description" : message
                    }]
                }).catch(err => {
                    let embed = new Discord.RichEmbed()
                    .setTitle("❌ Ошибка")
                    .setDescription("**1 HOOK, что-то не так, чекни конлось!**")
                    .setColor("#b70000");
                    console.log(err)
                    return channel.send(embed);
                })
            })
        } else {
            foundhook.send('', {
                "username" : title,
                "avatarURL" : avatar,
                "embeds" : [{
                    "color" : parseInt(`0x${color}`),
                    "description" : message
                }]
            }).catch(err => {
                let embed = new Discord.RichEmbed()
                .setTitle("❌ Ошибка")
                .setDescription("**2 HOOK, что-то не так, чекни конлось!**")
                .setColor("#b70000");
                console.log(err)
                return channel.send(embed);
            })
        }
    })
};