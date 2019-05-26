const Discord = require('discord.js');
const config = require('../../setting/cfg.js');
let load = config['emoji'].loading
const utils = require('../../functions/utils.js');
const request = require("request")


module.exports.run = async (bot, message, args, server_name) => {
    message.delete();
    let user = message.author;
    let user1 = message.mentions.users.first();
    if (!user1 || user1.id === user.id) {
        user = bot.user;
        user1 = message.author;
    }
    message.channel.send(load + 'Загрузка...').then(msg => {
        request('https://nekos.life/api/v2/img/pat', function (error, response, body) {
            try {
                let arr = JSON.parse(body);
                let embed = new Discord.RichEmbed()
                    .setDescription(`${user} **погладил(а) по голове** ${user1}`)
                    .setImage(arr['url'])
                    .setColor('RANDOM')
                    .setFooter(server_name) 
                    .setTimestamp();
                    msg.edit({embed
                }).then(function(message) {
                    message.react("✋")
                }).catch(function() {});
            } catch (e) {
                utils.errorr(message, e)
            }
        });
    });
}

module.exports.help = {
    name: 'pat',
    aliases: []
};