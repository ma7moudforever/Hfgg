const {  MessageActionRow, MessageButton, Client } = require('discord.js')

module.exports = {
    name: 'invite',
    description: 'Sends the client invite link!',
    cooldown: 10000,
    run: async (client, message, args) => {
        const button = new MessageActionRow().addComponents(
            new MessageButton()
            .setStyle("LINK")
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2080374975&scope=client%20applications.commands`)
            .setLabel("Invite Link")
        )
        
        message.reply({ content: `Invite me to your server!`,ephemeral: true, components: [button] , allowedMentions: {
           repliedUser: false
       }});
    }
}