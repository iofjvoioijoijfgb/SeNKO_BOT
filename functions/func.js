module.exports = (discord, bot, cfg, ytdl) => {
	bot.time = () => {return new Date(new Date().getTime() + 3*60*60*1000).toISOString().replace(/(.*?)T/, '').replace(/\..+/, '')}
	bot.time_out = (title, END, START) => {
		return bot.TimeOut[bot.TimeOut.push()] = {name : title, timeout : (END - START) / 1000 + 's'}
	}

	bot.isNumeric = (n) => {
		return !isNaN(parseFloat(n)) && isFinite(n);
	};

	bot.declOfNum = (number, titles) => {
		let cases = [2, 0, 1, 1, 1, 2];
		return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
	};

	bot.handleVideo = async (video, message, vc, playlist = false) => {
		let queue = bot.queue.get(message.guild.id);
		let music = {
			id: video.id,
			title: video.title,
			url: `https://www.youtube.com/watch?v=${video.id}`
		};

		if (!queue) {
			let queueConstruct = {
				textChannel: message.channel,
				voiceChannel: vc,
				connection: null,
				musics: [],
				volume: 50,
				playing: true
			};
			let voteConstruct = {
				votes: 0,
				voters: []
			};

			bot.queue.set(message.guild.id, queueConstruct);
			bot.votes.set(message.guild.id, voteConstruct)
			queueConstruct.musics.push(music);
			try {
				var connection = await vc.join();
				queueConstruct.connection = connection;
				bot.play(message.guild, queueConstruct.musics[0], message);
			} catch (err) {
				bot.queue.delete(message.guild.id);
				console.error(`Я не могу подключиться к твоему голосовому каналу: ${err}`);
			}
		} else {
			queue.musics.push(music);
			if (playlist) return;
			else return utils.done(message, `🎵 **${music.title}** добавлено в очередь!`);
		}
		return;
	}

	bot.play = (guild, music, message) => {
		let queue = bot.queue.get(guild.id);
		let votes = bot.votes.get(guild.id)
		if (!music) {
			queue.voiceChannel.leave();
			bot.queue.delete(guild.id);
			bot.votes.delete(guild.id);
			let embed = new discord.RichEmbed()
				.setTitle('Воспроизведение музыки закончилось!')
				.setColor('#ffd500')
			return queue.textChannel.send(embed);
		}

		let dispatcher = queue.connection.playStream(ytdl(music.url)).on('end', () => {
			queue.musics.shift();
			votes.votes = 0;
			votes.voters = [];
			setTimeout(() => {
				bot.play(guild, queue.musics[0], message);
			}, 250);
		}).on('error', err => console.error(err));

		dispatcher.setVolumeLogarithmic(queue.volume / 100);

		let embed = new discord.RichEmbed()
			.setTitle(music.title)
			.setDescription('🎵 Поставил: ' + message.author.username)
			.setColor('#ffd500')
		queue.textChannel.send(embed);
	}

	bot.bar = (min, max) => {
		let out = min / max * 100;
		function pBar(x){
			progress = x >= 0  ? '[](https://vk.com/)▬▬▬▬▬▬▬▬▬▬' : '' + this.progress;
			progress = x >= 10 ? '[▬](https://vk.com/)▬▬▬▬▬▬▬▬▬' : '' + this.progress;
			progress = x >= 20 ? '[▬▬](https://vk.com/)▬▬▬▬▬▬▬▬' : '' + this.progress;
			progress = x >= 30 ? '[▬▬▬](https://vk.com/)▬▬▬▬▬▬▬' : '' + this.progress;
			progress = x >= 40 ? '[▬▬▬▬](https://vk.com/)▬▬▬▬▬▬' : '' + this.progress;
			progress = x >= 50 ? '[▬▬▬▬▬](https://vk.com/)▬▬▬▬▬' : '' + this.progress;
			progress = x >= 60 ? '[▬▬▬▬▬▬](https://vk.com/)▬▬▬▬' : '' + this.progress;
			progress = x >= 70 ? '[▬▬▬▬▬▬▬](https://vk.com/)▬▬▬' : '' + this.progress;
			progress = x >= 80 ? '[▬▬▬▬▬▬▬▬](https://vk.com/)▬▬' : '' + this.progress;
			progress = x >= 90 ? '[▬▬▬▬▬▬▬▬▬](https://vk.com/)▬' : '' + this.progress;
			progress = x >= 99 ? '[▬▬▬▬▬▬▬▬▬▬](https://vk.com/)' : '' + this.progress;

			return progress
		}

		return {
			'bar' : pBar(out),
			'%' : Math.round(out, -1)
		}
	}

	// bot.setAva = () => {
	// 	// Morning
	// 	if(bot.time() > '06:00:00' && bot.time() < '22:00:00'){
	// 		return 'https://cdn.discordapp.com/avatars/574657711745007656/ecfcc60a844b9b14a098fa70152a64d9.png?size=2048'
	// 	} else {
	// 		return 'https://cdn.discordapp.com/attachments/573422322372050947/575774297369346058/IMG_20190508_225628.jpg'

	// 		//'https://cdn.discordapp.com/attachments/573422322372050947/575773400438407191/IMG_20190508_225646.jpg'
	// 	}
	// }
}