//Discord
const { MessageEmbed } = require("discord.js");

//Guild Model
const guildModel = require("../../models/guilds/guild");

//Export
module.exports = {
  name: "configs",
  description: "get configs information",
  permissions: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
    //Guild Data
    let data = await guildModel.findOne({guildID: message.guild.id});
    if(!data) {
     const newData = await guildModel.create({guildID: message.guild.id});
     await newData.save().catch(() => {});
    data = await guildModel.findOne({guildID: message.guild.id});
    }
    
    let logchannel = message.guild.channels.cache.get(data.log.channel) || `**there is no channel**`;
    let logboolean = "off";
    if(data.log.onoff === true) {
      logboolean = "on"
    } else {
      logboolean = "off"
    }
    let feedchannel = message.guild.channels.cache.get(data.feedback.channel) || `**there is no channel**`;
    let feedboolean = "off";
    if(data.feedback.onoff === true) {
      feedboolean = "on"
    } else {
      feedboolean = "off"
    }
    let sugchannel = message.guild.channels.cache.get(data.suggestion.channel) || `**there is no channel**`;
    let sugboolean = "off";
    if(data.suggestion.onoff === true) {
      sugboolean = "on"
    } else {
      sugboolean = "off"
    }
    let autorolelist = [];
    message.guild.roles.cache.forEach(r => {
      data.autorole.roles.forEach(rdata => {
        if(rdata === r.id) autorolelist.push(`<@&${r.id}>`)
      });
    });
    let autoroleboolean = "off";
    if(data.autorole.onoff === true) {
      autoroleboolean = "on"
    } else {
      autoroleboolean = "off"
    }
    let embed = new MessageEmbed()
    .setThumbnail(message.guild.iconURL({dynamic: true, format: "png"}))
    .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true, format: "png"}))
    .addField(`Log`,`On/Off: **${logboolean}**\nChannel: ${logchannel}`)
    .addField(`FeedBack`,`On/Off: **${feedboolean}**\nChannel: ${feedchannel}`)
    .addField(`Suggestion`,`On/Off: **${sugboolean}**\nChannel: ${sugchannel}`)
    .addField(`Autorole`,`On/Off: **${autoroleboolean}**\nRoles: ${autorolelist.join(", ") || `nothing`}`)

    
    message.reply({embeds: [embed], allowedMentions: {
        repliedUser: false
    }});
  }
}