const Discord = require('discord.js');
const config = require('../../setting/cfg.js');
const utils = require('../../functions/utils.js');
const request = require("request")

module.exports.run = async (bot, message, args, server_name) => {
  //if(!message.member.hasPermission("ADMINISTRATOR")) return utils.noPerms("**Требуется разрешение** `ADMINISTRATOR`")
  owners = new Set();
  owners.add('410838014990876672');
  if(!owners.has(message.author.id)) return utils.noPerms(message, 'Требуется доступ по ID!')
  message.delete();
  const code = message.content.split(" ").slice(1).join(" ");
  try {
   let evaled = eval(code);
   if (!code) {
      return utils.noReason(message, "📝 Вы не указали код !")
  }

   if (typeof evaled !== 'string')
     evaled = require('util').inspect(evaled);
  
     const embed = new Discord.RichEmbed()
     .setTitle(`EVAL ✅`)
 
     .setColor("0x4f351")
     .setDescription(`📥 Input: \n \`\`\`${code}\`\`\` \n 📤 Output: \n  \`\`\`${(evaled)}\`\`\``)
 
   message.channel.send({embed});
  } catch (err) {
   const embed = new Discord.RichEmbed()
   .setTitle(`EVAL ❌`)

   .setColor("0xff0202")
   .setDescription(`📥 Input: \n \`\`\`${code}\`\`\` \n 📤 Output: \n  \`\`\`${(err)}\`\`\``)

   message.channel.send({embed});
 }
}

module.exports.help = {
    name: 'eval',
    aliases: []
};