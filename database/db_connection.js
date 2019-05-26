var db = require('./db.js');
var moduls = require('./exports.js')
var config = require('../setting/cfg.js')

db.connect(config['ConnectDB'].ObjectDB(), function(err){
    if(err) {
        return moduls.help_connect()
    } else {
        require('../app.js')
    }
})