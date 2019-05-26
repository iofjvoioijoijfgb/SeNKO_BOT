const Discord = require("discord.js");
const config = require("../setting/cfg.js");

//command: no permission
module.exports.noPerms = (message, perm) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Ошибка")
        .setColor("#b70000")
        .addField("Требуется разрешение!", perm);
    message.channel.send(embed).then(m => m.delete(10000));
}

module.exports.noUser = (message, perm) => {
    message.delete();
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setTitle("Ошибка")
        .setColor("#b70000")
        .setDescription(perm);
    message.channel.send(embed).then(m => m.delete(10000));
}

//command: Worning
module.exports.noW = (message, perm) => {
    message.delete();
    let embed = new Discord.RichEmbed()
        .setTitle("⚠ Внимание")
        .setColor("#FFFF00")
        .setDescription(perm);
    message.channel.send(embed).then(m => m.delete(10000));
}

//command: no reason
module.exports.noReason = (message, perm) => {
    message.delete();
    let embed = new Discord.RichEmbed()
        .setTitle("Ошибка")
        .setDescription(perm)
        .setColor("#b70000");
    message.channel.send(embed).then(m => m.delete(10000));
}

//command: done
module.exports.done = (message, done) => {
    message.delete();
    let embed = new Discord.RichEmbed()
        .setTitle("Успех")
        .setDescription(done)
        .setColor("#00ff00");
    message.channel.send(embed).then(m => m.delete(10000));
}

module.exports.errorr = (message, err) => {
    message.delete();
    let embed = new Discord.RichEmbed()
    .setTitle(err)
    .setColor("#ff0000")
    .setImage("https://media1.tenor.com/images/41334cbe64331dad2e2dc6272334b47f/tenor.gif?itemid=8680016")
    .setTimestamp()
    .setFooter("❌ Error");
    message.channel.send({embed}).then(function(message) {
    message.react("❌").then(m => m.delete(10000));
});
}

module.exports.warn = (message, warn) => {
    message.delete();
    let embed = new Discord.RichEmbed()
    .setDescription(`⚠ | ${warn}`)
    .setColor("#ff0000");
    message.channel.send({embed}).then(m => m.delete(15000));
}