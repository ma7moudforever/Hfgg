const { CommandInteraction, Permissions, Client} = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "unhideall",
    description: "hideall a channel",
    permissions : ["MANAGE_CHANNELS"],
    run: async (client, message, args) => {
     message.guild.channels.cache.forEach(channel => {
           channel.permissionOverwrites.edit(message.guild.id, {
            VIEW_CHANNEL: null,
            CONNECT: null,
         });
       });
         message.reply({content: `> **:white_check_mark: Guild channels became visible**`, allowedMentions: {repliedUser: false}})
    },
};