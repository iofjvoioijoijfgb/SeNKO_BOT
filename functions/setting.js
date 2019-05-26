function welcome(bot, env){
	return {
		'0' : {
			title : `👋 | ${env}, Добро пожаловать на наш сервер`,
			color : '#ffd500',
			thum : ``,
			foot : ``
		},
		'1' : {
			title : ``,
			color : '',
			thum : ``,
			foot : ``
		},
		'2' : {
			title : ``,
			color : '',
			thum : ``,
			foot : ``
		}
	}
}

module.exports = welcome(bot, env);