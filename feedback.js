const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const guildModel = require("../../models/guilds/guild");

module.exports = {
  name: "feedback",
  description: "send new feedback !!",
  options: [
    {
      name: "new_feedback",
      description: "the feedback content!!",
      type: "STRING",
      required: true
    }
    ],
  run: async (client, interaction, args) => {
    let data = await guildModel.findOne({ guildID: interaction.guild.id });
        if(!data) {
          let newData = await guildModel.create({ guildID: interaction.guild.id });
          newData.save();
          data = await guildModel.findOne({ guildID: interaction.guild.id });
        }
    let feedback = interaction.options.getString("new_feedback");
    if(data.feedback.onoff === false) return interaction.reply({content: `> **:x: The feedback is off**`, ephemeral: true});
    
    let channel = interaction.guild.channels.cache.get(data.feedback.channel);
    if(!channel) return interaction.reply({content: `> **:x: The feedback channel is not found**`, ephemeral: true});
    let embed = new MessageEmbed()
    .setThumbnail(interaction.member.user.displayAvatarURL({dynamic: true, format: "png"}))
    .setAuthor(interaction.guild.name, interaction.guild.iconURL({dynamic: true, format: "png"}))
    .setDescription(`${feedback}\n`)
    .setFooter(`Feedback by ${interaction.user.tag}`, interaction.member.user.displayAvatarURL({dynamic: true, format: "png"}));
   
    channel.send({embeds: [embed]});
    interaction.reply({content: `> **:white_check_mark: Done added your feedback in ${channel}**`, ephemeral: true})
    
  }
}