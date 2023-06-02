const Discord = require("discord.js");

module.exports = {
  name: "settopic",
  description: "set topic channel !",
  options: [
    {
      name: "new_topic",
      description: `the new topic!`,
      type: "STRING",
      required: true
    },
    {
      name: "channel",
      description: `this is channel edited topic`,
      type: "CHANNEL",
      required: false
    }
    ],
  run: async (client, interaction,args) => {
    const [topic,channell] = args;
  let channel = interaction.options.getChannel("channel") || interaction.channel;
  let room = interaction.guild.channels.cache.find(c => c.id === channel.id);
  try {
   room.setTopic(topic).catch(() => {
    return interaction.reply({content: `> **:x: Please select text channel**`, ephemeral: true})
    });
  } catch (err) {
    return interaction.reply({content: `> **:x: Please select text channel**`, ephemeral: true})
  }
  interaction.reply({content: `> **:white_check_mark: Done changed ${channel} topic to \`${topic}\`**`});
  }
}