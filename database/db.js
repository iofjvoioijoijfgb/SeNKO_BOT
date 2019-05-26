var MongoClient = require('mongoose')
var moduls = require('./exports.js')
exports.connect = function(url, done) {
    MongoClient.connect(url, function(err) {
        if(err){
            return moduls.help_connect()
        }
        done();
    })
}

exports.no_connect = function(url, Discord, message){
	MongoClient.connect(url, function(err) {
        if(err){
            let embed = new Discord.RichEmbed()
            	.setTitle('❌ | !ERROR DB!')
            	.setDescription('Соединение с **\'Базой Данных\'** утеряно, сохранение данных невозможно!')
            	.setColor('#ff0000')
            message.channel.send(embed).then(msg => {
            	msg.delete(10000)
            })
        }
    })
}