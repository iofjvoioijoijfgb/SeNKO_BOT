const mongoose = require('mongoose');
const profile = mongoose.Schema({
	username : String,
    GuildID : String,
    userID: String,
    verified : Boolean,
    partner : Boolean,
    dev : Boolean,
    daily: String,
    coin: Number,
    warn: Number,
    lvl: Number,
    xp: Number
});

module.exports = mongoose.model("Profile", profile)