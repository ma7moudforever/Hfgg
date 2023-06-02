const { MessageEmbed } = require("discord.js");
const guildModel = require("../../models/guilds/guild");
const premium = require("../../models/premiums");
let bots = [];
premium.find({}, async (err, docs) => docs.forEach(doc => bots.push(doc.id)));

module.exports = {
    name: "voiceStateUpdate",
    run: async (oldState, newState, client) => {
      for (id in bots) {
       let member = oldState.guild.members.cache.get(bots[id]);
       if(member) return;
       }
     let data = await guildModel.findOne({ guildID: newState.guild.id });
     if(!data) {
      let newData = await guildModel.create({ guildID: newState.guild.id });
      newData.save();
      data = await guildModel.findOne({ guildID: newState.guild.id });
     }
     
     if(data.log.onoff === true) {
       if(data.log.channel === "none") return;
         var sChannel = newState.guild.channels.cache.get(data.log.channel);
         if (!sChannel) return;
           
         const allLogs = await newState.guild.fetchAuditLogs();
         const findChannel1 = newState.guild.channels.cache.find(r => r.id === newState.channelId);
        const findChannel = newState.guild.channels.cache.find(r => r.id === oldState.channelId);
        if(!findChannel && findChannel1) {
          const embed = new MessageEmbed()
        .setThumbnail(newState.guild.iconURL({dynamic: true}))          
        .setAuthor(newState.member.user.tag, newState.member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter(newState.guild.name, newState.guild.iconURL({ dynamic: true }))
        .setDescription(`**🔊 ${newState.member} has joined ${findChannel1} channel.**`)
        sChannel.send({ embeds: [embed] })
        } else
        if(findChannel && !findChannel1) {
          const embed = new MessageEmbed()
        .setThumbnail(newState.guild.iconURL({dynamic: true}))
        .setAuthor(newState.member.user.tag, newState.member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter(newState.guild.name, newState.guild.iconURL({ dynamic: true }))
        .setDescription(`**🔊 ${newState.member} has left  from \`${findChannel.name}\` channel.**`)
        sChannel.send({ embeds: [embed] })
        } else 
        if(findChannel && findChannel1) {
         const moveLogs = await newState.guild.fetchAuditLogs({ type: "MEMBER_MOVE" });
        const fetchModerator = moveLogs.entries.first();
        const embed = new MessageEmbed()
        .setThumbnail(newState.guild.iconURL({dynamic: true}))
        .setAuthor(newState.member.user.tag, newState.member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter(newState.guild.name, newState.guild.iconURL({ dynamic: true }))
        .setDescription(`**🔊 ${newState.member} moved from ${findChannel} to ${findChannel1}**`)
        .addField('By:', `<@${fetchModerator.executor.id}>`)
        
        sChannel.send({ embeds: [embed] })
        }
       
     }
     
     
    }
}