const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone : true});
const cfg = require('./setting/cfg.js');
const requireAll = require('require-all');
const fs = require('fs');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const modules = require('./functions/mudules/afk.js')
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const START = Date.now()

require('./functions/func.js')(Discord, bot, cfg, ytdl)

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.youtube = new YouTube(cfg['token'].YT_API_V3);
bot.queue = new Map();
bot.votes = new Map();
bot.afk = new Map();
bot.afknum = 1;
bot.ccore = new Array();
bot.TimeOut =  new Array();

let y = process.openStdin()
y.addListener('data', res => {
	let x = res.toString().trim().split(/ +/g)
	bot.channels.get('525416169965092873').send(x.join(' '))
})

let load = async () => {
	let events = await readdir('./events/')
	let commands = requireAll({ dirname: `${__dirname}/commands/` });

	for (const f in commands) bot.commands.set(f, commands[f]);
	for (const dir in commands) {
	    for (const f in commands[dir]) {
	        bot.commands.set(f, commands[dir][f]);
	        console.log(`Команда ${f} из модуля ${dir} была загружена.`);
	        bot.ccore[bot.ccore.push()] = f
	    }
	}

	events.forEach(file => {
		if(file.split('.').slice(-1)[0] !== 'js') return;
		let eventName = file.split('.')[0];
		let event = require(`./events/${file}`);
		bot.on(eventName, event.bind(null, bot));
		delete require.cache[require.resolve(`./events/${file}`)]
		console.log('Event ' + eventName + ' loaded!')
	})

	bot.time_out('Event load in', Date.now(), START)
}

load()
bot.login(cfg['token'].DS_TOKEN)
bot.time_out('Load app.js in', Date.now(), START)