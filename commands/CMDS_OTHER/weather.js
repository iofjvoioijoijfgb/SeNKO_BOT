const Discord = require('discord.js');
const utils = require('../../functions/utils.js');
const weather = require('weather-js');

module.exports.run = async (bot, message, args, server_name) => {
    weather.find({search: args.join(' '), degreeType: 'C'}, function(err, res) {
        // перевод на русский
        var days = {
            Sunday : "Воскресенье", 
            Monday : "Понедельник", 
            Tuesday : "Вторник", 
            Wednesday : "Среда", 
            Thursday : "Четверг", 
            Friday : "Пятница", 
            Saturday : "Суббота"
        }

        if(!!err){
            message.delete();
            utils.errorr(message, err)
        } else {
            message.delete();
            var cur = res[0].current;
            var loc = res[0].location;

            var day = days[cur.day];

            let embed = new Discord.RichEmbed()
                .setDescription(`**${cur.skytext}**`)
                .setTitle(`Погода в ${loc.name}`)
                .setThumbnail(cur.imageUrl)
                .setColor("#ffd500")
                .addField(`Временная зона`, `UTC${loc.timezone}`, true)
                .addField(`Тип`, loc.degreetype, true)
                .addField(`Температура`, `${cur.temperature}°C`, true)
                .addField(`Средняя температура`, `${cur.feelslike}°C`, true)
                .addField(`Ветер`, cur.winddisplay, true)
                .addField(`Влажность`, `${cur.humidity}%`, true)
                .addField(`День недели`, day, true)
                .addField(`Дата`, cur.date, true)
                .setFooter(server_name)
                .setTimestamp();
            message.channel.send(embed);
        }
    })
}
