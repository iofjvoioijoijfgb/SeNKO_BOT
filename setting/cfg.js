function cfg(){
	return {
		"token" : {
			'DS_TOKEN' : 'NTc0NjU3NzExNzQ1MDA3NjU2.XM8m4Q.kHua9AnNjNKCeyqUgjVkbT-OdjU',
			'YT_API_V3' : 'AIzaSyC2ZGWhechfOv2ssGjxxGVD1D5LbZ_EVTQ',
			'KEY_FT' : ''
		},
		"prefix" : ['s!', 's1', 'S!', 'S1', '<@574657711745007656>'],
		"CNF" : true,
		"emoji" : {
			"loading" : '<a:loading:574291498103996416> ',
			"cross" : '<:cross1:576706947395354634> ',
			"check" : '<:check1:576706984955478016> ',
			"verified" : '<:verified:577546075288633354> ',
			"partners" : '<:partner:577568849587732499> ',
			"online" : '<:online:577575757975650304> ',
			"invis" : '<:invisible:577575719450837038> ',
			"idle" : '<:idle:577575792868065292> ',
			"dnd" : '<:dnd:577575831648600075> ',
			"stream" : '<:stream:577576527135506445> '
		},
    	'ConnectDB' : { // Соединение с сервером!
    		URL : 'mongodb://KHRI_AJIE-DB:YHYU78uifd89JIUN87fduij@subox.pp.ua:2025/SeNKO_BOT_DB',
	        ObjectDB : function(){
	            return this.URL
	        }
    	},
    	'number' : {
    		MinVolue : 5,
    		MaxVolue : 10
    	}
	}
}

module.exports = cfg();