const Discord = require('discord.js');
const vm = require('vm')
const config = require('../../setting/cfg.js');
const utils = require('../../functions/utils.js');
const request = require("request")

const codeContext = {};
vm.createContext(codeContext);

module.exports.run = async (bot, message, args, server_name) => {
    message.delete();
    try {
        let evaled = vm.runInContext(args.join(" "), codeContext);
        message.channel.send(evaled, {code:"js",split:"\n"});
    } catch(e) {
        message.channel.send(e, {code:"js",split:"\n"});
    }
}

module.exports.help = {
    name: 'run',
    aliases: []
};