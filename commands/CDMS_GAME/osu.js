const Discord = require('discord.js');
const utils = require('../../functions/utils.js');

module.exports.run = async (bot, message, args, server_name) => {
	message.delete()
	let mode = args[0];
	let user = args[1] + ' ' + args[2];
	if(!args[2]) {
		user = args[1]
	}
	let link = ' ';
	if(!mode) return utils.noReason(message, 'Не указан режим. \n**Режимы: `osu`, `taiko`, `ctb`, `mania`.**')
	if(!user) return utils.noReason(message, 'Укажи пользователя')
	if(mode === 'osu') link = `http://lemmmy.pw/osusig/sig.php?colour=pink&uname=${user}&pp=2&countryrank&flagshadow&darktriangles&opaqueavatar&onlineindicator=undefined&xpbar`
	if(mode === 'taiko') link = `http://lemmmy.pw/osusig/sig.php?colour=pink&uname=${user}&mode=1&pp=2&countryrank&flagshadow&darktriangles&opaqueavatar&onlineindicator=undefined&xpbar`
	if(mode === 'ctb') link = `http://lemmmy.pw/osusig/sig.php?colour=pink&uname=${user}&mode=2&pp=2&countryrank&flagshadow&darktriangles&opaqueavatar&onlineindicator=undefined&xpbar`
	if(mode === 'mania') link = `http://lemmmy.pw/osusig/sig.php?colour=pink&uname=${user}&mode=3&pp=2&countryrank&flagshadow&darktriangles&opaqueavatar&onlineindicator=undefined&xpbar`

	let embed = new Discord.RichEmbed()
		.setTitle(user)
		.setImage(link)
		.setColor('#ffd500')
		.setFooter(server_name)
	message.channel.send(embed)
}