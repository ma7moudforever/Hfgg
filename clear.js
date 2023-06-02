const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "clear",
    description: "Clear Messages!.",
    permissions: "MANGAE_MESSAGES",
    options: [{
        name: "channel",
        description: "The Channel You Wont To Clear Messages In!.",
        type: 7,
        required: false
    }, {
        name: "messages",
        description: "How Much The Message You Wont to delete!.",
        type: 3,
        required: false
    }],

    run: async(client, interaction, args) => {
 let messagecount = parseInt(interaction.options.getString('messages')) || '100';
        let channel = interaction.options.getChannel('channel') || interaction.channel;
       //let errsChannel = client.channels.cache.get("924481708731015249");
            if (messagecount > 100) return interaction.reply({ content: `> :x: **I Can't Delete More Than 100 Message**`, ephemeral: true });
            channel.messages.fetch({ limit: 100 }).then(() => channel.bulkDelete(messagecount, true)).then(msgs => {
                interaction.reply({ content: `> :wastebasket: **\`${msgs.size}\` Messages has been deleted **` }).catch(err => {})
                setTimeout(function() {
                  interaction.deleteReply();
                }, 1000);
            });
        }
    }