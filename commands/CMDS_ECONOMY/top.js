const Discord = require("discord.js");
const Coins = require("../../database/models/profile.js");
const utils = require('../../functions/utils.js');

module.exports.run = async (bot, message, args) => {
    message.delete();

    let req = args[0] == 'lvl' ? 'lvl' : args[0] == 'coin' ? 'coin' : args[0] == 'xp' ? 'xp' : 'lvl';
    let req_res = req == 'lvl' ? 'Уровню' : req  == 'coin' ? 'Деньгам' : req  == 'xp' ? 'XP' : 'Уровню';

    Coins.find({
        GuildID: message.guild.id
    }).sort([
        [req, 'descending']
    ]).exec((err, res) => {
        if (err) console.log(err);

        let embed = new Discord.RichEmbed()
            .setTitle("!TOP SERVER! по " + req_res)
            //if there are no results
            if (res.length === 0) {
                embed.setColor("RED");
                embed.addField("No data found", 'База Данных не зарегистрирована')
            } else if (res.length < 10) {
                //less than 10 results
                embed.setColor("#ffd500");
                for (i = 0; i < res.length; i++) {
                    let top = i == 0 ? '🥇' : i == 1 ? '🥈' : i == 2 ? '🥉' : ''
                    let nxtLvlXp = res[i].lvl * 300;
                    let difference = nxtLvlXp - res[i].xp;
                    let member = message.guild.members.get(res[i].userID) || "User Left"
                    if (member === "User Left") {
                        embed.addField(`[${i + 1}] ${top} ${member}`, `**|\tCoins: ${res[i].coin}\n|\tLVL: ${res[i].lvl}\n|\tXP: [${res[i].xp} / ${difference}]**`);
                    } else {
                        embed.addField(`[${i + 1}] ${top} ${member.user.username}`, `**|\tCoins: ${res[i].coin}\n|\tLVL: ${res[i].lvl}\n|\tXP: [${res[i].xp} / ${difference}]**`);
                    }
                }
            } else {
                embed.setColor("#ffd500");
                for (i = 0; i < 10; i++) {
                    let top = i == 0 ? '🥇' : i == 1 ? '🥈' : i == 2 ? '🥉' : ''
                    let nxtLvlXp = res[i].lvl * 300;
                    let difference = nxtLvlXp - res[i].xp;
                    let member = message.guild.members.get(res[i].userID) || "User Left"
                    if (member === "User Left") {
                        embed.addField(`[${i + 1}] ${top} ${member}`, `**|\tCoins: ${res[i].coin}\n|\tLVL: ${res[i].lvl}\n|\tXP: [${res[i].xp} / ${difference}]**`);
                    } else {
                        embed.addField(`[${i + 1}] ${top} ${member.user.username}`, `**|\tCoins: ${res[i].coin}\n|\tLVL: ${res[i].lvl}\n|\tXP: [${res[i].xp} / ${difference}]**`);
                    }
                }
            }
        message.channel.send(embed);
    })
}

module.exports.help = {
  name: "top"
}