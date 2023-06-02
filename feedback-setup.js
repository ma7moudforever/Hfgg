//Discord
const Discord = require('discord.js') 

//Guild Model
const guildModel = require("../../models/guilds/guild");

//Module Render
module.exports = {
  name:"feedback-setup",
  description: 'Set Feedback channel',
  permissions: ['MANAGE_GUILD'],
  run: async(client, message, args) => {
      //Guild Data
      let data = await guildModel.findOne({guildID: message.guild.id});
      
      if(!data) {
        const newData = await guildModel.create({guildID: message.guild.id});
        await newData.save().catch(() => {});
        data = await guildModel.findOne({guildID: message.guild.id});
      }
      
      //Variables
      let type = args[0];
      let channel = message.mentions.channels.first() || client.channels.cache.get(args[1]) || message.guild.channels.cache.find(c => c.name .startsWith === args[1]);
      
      if(type === "on") {
        data.feedback = {
          channel: data.feedback.channel,
          onoff: true
        }
        message.reply({content: `> **:white_check_mark: Done the feedback is now on**`, allowedMentions: {
        repliedUser: false
        }});
      } else if(type === "off") {
        data.feedback = {
          channel: data.feedback.channel,
          onoff: false
        }
        message.reply({content: `> **:white_check_mark: Done the feedback is now off**`, allowedMentions: {
        repliedUser: false
        }});
      } else if(type === "set") {
        if(!channel) return message.reply({content: `> **:x: Please select channel**`, allowedMentions: {
          repliedUser: false
          }});
        if(channel.type === "GUILD_VOICE" || channel.type === "GUILD_CATEGORY") return message.reply({content: `> **:x: Please select text channel**`, ephemeral: true, allowedMentions: {
          repliedUser: false
          }});
        
        data.feedback = {
          channel: channel.id,
          onoff: data.feedback.onoff
        }
        message.reply({content: `> **:white_check_mark: Done the feedback channel is now ${channel}**`, allowedMentions: {
        repliedUser: false
        }});
      } else if(type === "current") {
        if(data.feedback.channel === "none") {
          message.reply({content: `> **:x: The guild not set feedback channel**`, allowedMentions: {
            repliedUser: false
            }});
        } else {
          let lChannel = message.guild.channels.cache.get(data.feedback.channel);
          if(!lChannel) return message.reply({content: `> **:x: The guild not set feedback channel**`, allowedMentions: {
            repliedUser: false
            }});
          message.reply({content: `> **:white_check_mark: The current feedback channel: ${lChannel}**`, allowedMentions: {
            repliedUser: false
            }});
        }
      } else {
        return message.reply({content: `> **:x: You are using this cmd incorrectly,\n> so go to the help menu and show how to use this command**`, allowedMentions: {
          repliedUser: false
          }});
      }
      data.save();
  }
};
 