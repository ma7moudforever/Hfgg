const { CommandInteraction, Permissions, Client} = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "lockall",
    description: "lockall a channel",
    permissions : ["MANAGE_CHANNELS"],
    run: async (client, message, args) => {
     message.guild.channels.cache.forEach(channel => {
        channel.permissionOverwrites.edit(message.guild.id, {
            VIEW_CHANNEL: false,
            CONNECT: false
         });
       });
         message.reply({content: `> **:lock: Guild channels became locked**`, allowedMentions: {repliedUser: false}})
    },
};