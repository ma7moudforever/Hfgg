const { CommandInteraction, Permissions, Client} = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "hide",
    description: "hide a channel",
    permissions : ["MANAGE_CHANNELS"],
    run: async (client, message, args) => {
     let channel = message.mentions.channels.first() || client.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name .startsWith === args[0]);
     
     if(channel) {
         channel.permissionOverwrites.edit(message.guild.id, {
            VIEW_CHANNEL: false,
            CONNECT: false
         });
         message.reply({content: `> **:white_check_mark: ${channel} channel became unvisible**`, allowedMentions: {
            repliedUser: false
            }})
     } else {
           message.channel.permissionOverwrites.edit(message.guild.id, {
            VIEW_CHANNEL: false,
            CONNECT: false
         });
         message.reply({content: `> **:white_check_mark: ${message.channel} channel became unvisible**`, allowedMentions: {
            repliedUser: false
            }})
     }
    },
};