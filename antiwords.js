const { Permissions } = require("discord.js");
const Discord = require("discord.js");
const guildModel = require("../../models/guilds/guild");
const premium = require("../../models/premiums");
let bots = [];
premium.find({}, async (err, docs) => docs.forEach(doc => bots.push(doc.id)));

module.exports = {
    name: "messageCreate",
    run: async (message, client) => {
      if(message.author.bot) return;
      if(!message.guild) return;
      for (id in bots) {
       let member = message.guild.members.cache.get(bots[id]);
       if(member) return;
       }
       let data = await guildModel.findOne({ guildID: message.guild.id });
  if(!data) data = await guildModel.findOne({ guildID: message.guild.id });
 if(!data) return;   if(data.protect.antiwords.onoff === true) {
      let words = data.protect.antiwords.words;
      let word = words.find(x => x === message.content.toLowerCase());
      if(word) {
        if(data.protect.whiteList.trustes.includes(message.author.id)) return;
        if(message.author.id === message.guild.ownerId) return;
        message.delete();
        message.channel.send(`${message.author}, don't say the bad words.`).then(msg =>  {
          setTimeout(() => {
           msg.delete();
          },2000)

        });
      }
        }
    }
}