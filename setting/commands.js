module.exports = {
    // GAME
	osu: {
		"name" : "osu",
        "type" : "g",
        "args" : ["<mod> <user>"],
        "desc": "Посмотреть профель OSU"
	},

    // ECONOMY
	daily: {
		"name" : "daily",
        "type" : "e",
        "args" : ["none"],
        "desc": "Ежедневный бонус"
	},

	pay: {
		"name" : "pay",
        "type" : "e",
        "args" : ["<@user> <num>"],
        "desc": "Перевести деньги пользователю"
	},

	top: {
		"name" : "top",
        "type" : "e",
        "args" : ["[mod]"],
        "desc": "Посмотреть топ сервера"	
	},

    // FUN
	cuddle: {
		"name" : "cuddle",
        "type" : "f",
        "args" : ["[@user]"],
        "desc": "Прижатся к кому-то"
	},

	feed: {
		"name" : "feed",
        "type" : "f",
        "args" : ["[@user]"],
        "desc": "Дать по кушать"
	},

	hug: {
		"name" : "hug",
        "type" : "f",
        "args" : ["[@user]"],
        "desc": "Обнять кого-то"
	},

	kiss: {
		"name" : "kiss",
        "type" : "f",
        "args" : ["[@user]"],
        "desc": "Поцеловать каго-то"
	},

	pat: {
		"name" : "pat",
        "type" : "f",
        "args" : ["[@user]"],
        "desc": "Погладить кого-то"
	},

	poke: {
		"name" : "poke",
        "type" : "f",
        "args" : ["[@user]"],
        "desc": "Тыкнуть кого-то"
	},

	slap: {
		"name" : "slap",
        "type" : "f",
        "args" : ["[@user]"],
        "desc": "Ударить кого-то"
	},

	tickle: {
		"name" : "tickle",
        "type" : "f",
        "args" : ["[@user]"],
        "desc": "Пошекотать кого-то"
	},

    // INFO
	emojiinfo: {
		"name" : "emojiinfo",
        "type" : "i",
        "args" : ["<emoji>"],
        "desc": "Информация о emoji"
	},

	help: {
		"name" : "help",
        "type" : "i",
        "args" : ["none"],
        "desc": "Список команд"
	},

	profile: {
		"name" : "profile",
        "type" : "i",
        "args" : ["[@user]"],
        "desc": "Посмотреть чей-то профиль"
	},

	serverinfo: {
		"name" : "serverinfo",
        "type" : "i",
        "args" : ["none"],
        "desc": "Узнать информацию о сервере"	
	},

	stats: {
		"name" : "stats",
        "type" : "i",
        "args" : ["none"],
        "desc": "Узнать статистику бота"	
	},

    // MODERATION
	ban: {
		"name" : "ban",
        "type" : "m",
        "args" : ["<@user> [reason]"],
        "desc": "За банить пользователя",
        "perm" : 'MANAGE_MESSAGES'
	},

	kick: {
		"name" : "kick",
        "type" : "m",
        "args" : ["<@user> [reason]"],
        "desc": "За мутить пользователя",
        "perm" : 'MANAGE_MESSAGES'
	},

	clear: {
		"name" : "clear",
        "type" : "m",
        "args" : ["<0/100> || <@user> <1/100>"],
        "desc": "Удалить определённое кол-во сообщений",
        "perm" : 'MANAGE_MESSAGES'
	},

	report: {
		"name" : "report",
        "type" : "m",
        "args" : ["<@user> [reason]"],
        "desc": "Написать жалобу на пользователя"
	},

	shell: {
		"name" : "shell",
        "type" : "m",
        "args" : ["<code>"],
        "desc": "Эмулировать terminal",
        "perm" : 'OWNER BOT'
	},

    // MUSIC / SOUND
	play: {
		"name" : "play",
        "type" : "s",
        "args" : ["<music/url>"],
        "desc": "Поставить музыку"
	},

	pause: {
		"name" : "pause",
        "type" : "s",
        "args" : ["none"],
        "desc": "Поствить музыку на паузу"
	},

	queue: {
		"name" : "queue",
        "type" : "s",
        "args" : ["none"],
        "desc": "Посмотреть очередь"
	},

	resume: {
		"name" : "resume",
        "type" : "s",
        "args" : ["none"],
        "desc": "Восстановить проигрывания"
	},

	search: {
		"name" : "search",
        "type" : "s",
        "args" : ["<music>"],
        "desc": "Найти музыку"
	},

	skip: {
		"name" : "skip",
        "type" : "s",
        "args" : ["none"],
        "desc": "Скупнуть музыку"
	},

	stop: {
		"name" : "stop",
        "type" : "s",
        "args" : ["none"],
        "desc": "Остановить музыку"
	},

	volume: {
		"name" : "volume",
        "type" : "s",
        "args" : ["<0/100>"],
        "desc": "Добавить громкости"
	},

    // OTHER
	afk: {
		"name" : "afk",
        "type" : "o",
        "args" : ["[reason]"],
        "desc": "Куда-то отойти"
	},

	sms: {
		"name" : "sms",
        "type" : "o",
        "args" : ["<@user> <msg>"],
        "desc": "Отправить sms пользователь"
	},

	time: {
		"name" : "time",
        "type" : "o",
        "args" : ["none"],
        "desc": "Узнать текущее время"
	},

	weather: {
		"name" : "weather",
        "type" : "o",
        "args" : ["<city || country>"],
        "desc": "Узнать погоду в городе или стране"
	},

    // TOOLS
	avatar: {
		"name" : "avatar",
        "type" : "t",
        "args" : ["[@user]"],
        "desc": "Получить аватарку пользователя"
	},

	eval: {
		"name" : "eval",
        "type" : "t",
        "args" : ["<code>"],
        "desc": "Эмулировать код",
        "perm" : "Требуется доступ по ID"		
	},

	hook: {
		"name" : "hook",
        "type" : "t",
        "args" : ["<title> <desc> [color] [url]"],
        "desc": "Создать WebHook"
	},

	run: {
		"name" : "run",
        "type" : "t",
        "args" : ["<code>"],
        "desc": "Эмулировать песочницу"
	},

	say: {
		"name" : "say",
        "type" : "t",
        "args" : ["<msg>"],
        "desc": "Сказать от имени бота"
	},

	setcolor: {
		"name" : "setcolor",
        "type" : "t",
        "args" : ["<#hex>"],
        "desc": "Установить цвет на свой ник"
	},

	test: {
		"name" : "test",
        "type" : "t",
        "args" : ["none"],
        "desc": "just test"		
	},

	translate: {
		"name" : "translate",
        "type" : "t",
        "args" : ["<lang> <msg>"],
        "desc": "Yandex переводчик"
	}
}