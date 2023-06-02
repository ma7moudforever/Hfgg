const { MessageEmbed } = require("discord.js");
const guildModel = require("../../models/guilds/giveaways");

module.exports = {
  name: "reroll",
  description: "giveaway reroll !!",
  permissions: ["MANAGE_GUILD"],
  
  run: async (client, message, args) => {
    let msgFetch = args[0];
    let data = await guildModel.findOne({guildID: message.guild.id, messageID: msgFetch });
    if(!data) return message.reply({content:`This message is not giveaway !!`});
    
    let giveawayChannel = message.guild.channels.cache.get(data.channelID);
    
   await giveawayChannel.messages.fetch(msgFetch).then(msg => {
   if (msg.author.id != client.user.id) return message.reply({content: `**> :x: This is not a giveaway message**`, ephemeral: true});
   if (!msg.content.startsWith(`**🎉 GIVEAWAY`)) return message.reply({content: `**> :x: This is not a giveaway message**`,ephemeral: true});
   if (msg.content !=`**🎉 GIVEAWAY ENDED 🎉**`) return message.reply({content: `**> :x: The giveaway is not ended**`, ephemeral: true});
   if (msg.reactions.cache.size < 1) return message.reply({content:`** :x: I can't find reactions in this message**`, ephemeral: true});
   if (msg.reactions.cache.filter(a => a.emoji.name == "🎉").map(reaction => reaction.count)[0] <= 1) return message.channel.send(``);
   
   msg.reactions.cache.filter(a => a.emoji.name == "🎉").map(r => r.users.fetch().then(async u => {
    let rusers = u.filter(user => !user.bot).random(parseInt(data.wins));
    message.delete();
   message.channel.send({content: `**> :white_check_mark: Done rerolled the giveaway**`}).then((mssg) => {
    setTimeout(function() {
       mssg.delete();
     }, 4000);
   }); 
   let embed2 = new MessageEmbed()
    .setColor("RED")
    .setAuthor(data.prize)
    .setFooter(`Ended at`)
    .setTimestamp()
    .setDescription(`Hosted by: <@${data.hostedID}>
Winners:\n${rusers || "No winners"}`);
    await msg.edit({embeds: [embed2]});
    
    await giveawayChannel.send({content: `**> 🎉 The new winner/s is: ${rusers}**`});
    
    let userss = [];
    rusers.map(u => {
       userss.push(`${u.tag} [${u.id}]`)
    })
    data.endedWins = userss;
    data.save();
   }));
   }).catch(err => {
     console.log(err);
      return message.reply({content: `**> :x: This ${messageFetch} is not message id**`, ephemeral: true})
   });
  }
}