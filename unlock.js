const { CommandInteraction, Permissions, Client} = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "unlock",
    description: "unlock a channel",
    permissions : ["MANAGE_CHANNELS"],
    run: async (client, message, args) => {
     let channel = message.mentions.channels.first() || client.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name .startsWith === args[0]);
     
     if(channel) {
         channel.permissionOverwrites.edit(message.guild.id, {
            SEND_MESSAGES: null,
            SPEAK: null
         });
         message.reply({content: `> **:unlock: ${channel} channel became unlocked**`, allowedMentions: {repliedUser: false}})
     } else {
           message.channel.permissionOverwrites.edit(message.guild.id, {
            SEND_MESSAGES: null,
            SPEAK: null
         });
         message.reply({content: `> **:unlock: ${message.channel} channel became unlocked**`, allowedMentions: {repliedUser: false}})
     }
    },
};