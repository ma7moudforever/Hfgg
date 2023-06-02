const { CommandInteraction, Permissions, Client} = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "unlockall",
    description: "unlockall a channel",
    permissions : ["MANAGE_CHANNELS"],
    run: async (client, message, args) => {
     message.guild.channels.cache.forEach(channel => {
        channel.permissionOverwrites.edit(message.guild.id, {
            VIEW_CHANNEL: false,
            CONNECT: false
         });
       });
         message.reply({content: `> **:unlock: Guild channels became unlocked**`, allowedMentions: {repliedUser: false}})
    },
};