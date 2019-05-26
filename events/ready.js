const START = Date.now()

let OK = 
"+------------ [ Successful Start ] ------------+\n" +
"| .d8888. d88888b d8b   db db   dD  .d88b.  db |\n" +
"| 88'  YP 88'     888o  88 88 ,8P' .8P  Y8. 88 |\n" +
"| `8bo.   88ooooo 88V8o 88 88,8P   88    88 YP |\n" +
"|   `Y8b. 88~~~~~ 88 V8o88 88`8b   88    88    |\n" +
"| db   8D 88.     88  V888 88 `88. `8b  d8' db |\n" +
"| `8888Y' Y88888P VP   V8P YP   YD  `Y88P'  YP |\n" +
"+----------------------------------------------+\n"

module.exports = async (bot) => {
	let rep = '\n'.repeat(50)
	console.log(rep + OK + '\n')
	bot.time_out('Started bot in', Date.now(), START)

	for(var i = 0; i < bot.TimeOut.length; i++){
		let arr = bot.TimeOut;
		console.log(arr[i].name, arr[i].timeout);
	}
}