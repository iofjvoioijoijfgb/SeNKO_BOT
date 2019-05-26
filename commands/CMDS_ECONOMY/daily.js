const Discord = require('discord.js');
const config = require('../../setting/cfg.js');
const utils = require('../../functions/utils.js');
const moment = require('moment');
const Profile = require('../../database/models/profile.js');
const emoji = config['emoji']

module.exports.run = async (bot, message, args, server_name) => {
    Profile.findOne({
        GuildID : message.guild.id,
        userID: message.author.id
    }, (err, out) => {
        if(err) return utils.errorr(message, err)
        if (out.daily != moment().format('L')) {
            out.daily = moment().format('L')
            if(!out){
                let newCoin = new Profile({
                    GuildID : message.guild.id,
                    userID: message.author.id,
                    coin: out.coin,
                    daily: moment().format('L')
                })
                newCoin.save()
            } else {
                out.coin = out.coin + 500
                out.save()
                message.delete()
                let embed = new Discord.RichEmbed()
                    .setTitle(emoji.check + ' DAILY')
                    .setColor('#ffd500')
                    .setDescription(`**${message.author.username}** | Ты получил **500$**`)
                message.channel.send(embed).then(m => m.delete(10000))
            }
        } else {
            message.delete()
            let embed = new Discord.RichEmbed()
                .setTitle(emoji.cross + ' DAILY')
                .setColor('#ff0000')
                .setDescription(`**${message.author.username}** | Ты уже получин свою награду, следующая **` + moment().endOf('day').fromNow() + '**')
            message.channel.send(embed).then(m => m.delete(10000))
        }
    })
}

module.exports.help = {
    name: 'daily',
    aliases: []
};