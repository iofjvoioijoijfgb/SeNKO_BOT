const Discord = require('discord.js')

module.exports.ECONOMY = (message, Profile) => {
	let addXP = Math.floor(Math.random() * 8) + 7
	let addCoins = Math.ceil(Math.random() * 50)
    let addCoin1 = Math.ceil(Math.random() * 50)

    let add = addCoins == addCoin1 ? addCoins : 0
    if(add == addCoins){
        let embed = new Discord.RichEmbed()
        .setDescription(`**${message.author.username}** Добавленно **${add}$**`)
        .setColor('#ffd500')
        message.channel.send(embed).then(msg => {
            msg.delete(10000)
        })
    }

    Profile.findOne({
        GuildID : message.guild.id,
        userID: message.author.id
    }, (err, out) => {
        if(err) console.log(err)
        if(!out){
            let newLvl = new Profile({
                GuildID : message.guild.id,
                userID : message.author.id,
                username : message.author.username,
                verified : false,
                partner : false,
                dev : false,
    			daily: '',
    			coin: 0,
    			warn: 0,
    			lvl: 0,
    			xp: 1
            })
            newLvl.save(function(err, res) {
                if (err) return console.log(err);
            })
        } else {
            let nxtLvl = out.lvl * 300;
            out.xp = out.xp + addXP
            out.coin = out.coin + add
            out.save(function(err, res) {
                if (err) return console.log(err);
            });
            if(nxtLvl <= out.xp){
                let curlvl = out.lvl; + 1
                out.lvl = curlvl + 1;
                out.xp = out.xp - out.xp

                let embed = new Discord.RichEmbed()
                    .setTitle('!LVL UP!')
                    .setDescription(`**${out.username} | Поздравляю с получением ${curlvl + 1} уровня!!**`)
                    .setColor('#ffd500')
                    .setFooter(message.author.tag, message.author.avatarURL)
                message.channel.send(embed).then(msg => {
                    msg.delete(10000)
                })
            }
        }
    })
}