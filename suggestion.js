const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const guildModel = require("../../models/guilds/guild");

module.exports = {
  name: "suggestion",
  description: "send new suggestion !!",
  options: [
    {
      name: "new_suggestion",
      description: "the suggestion content!!",
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
    let suggestion = interaction.options.getString("new_suggestion");
    if(data.suggestion.onoff === false) return interaction.reply({content: `> **:x: The suggestion is off**`, ephemeral: true});
    
    let channel = interaction.guild.channels.cache.get(data.suggestion.channel);
    if(!channel) return interaction.reply({content: `> **:x: The suggestion channel is not found**`, ephemeral: true});
    let embed = new MessageEmbed()
    .setThumbnail(interaction.member.user.displayAvatarURL({dynamic: true, format: "png"}))
    .setAuthor(interaction.guild.name, interaction.guild.iconURL({dynamic: true, format: "png"}))
    .setDescription(`${suggestion}\n`)
    .setFooter(`Suggestion by ${interaction.user.tag}`, interaction.member.user.displayAvatarURL({dynamic: true, format: "png"}));
   
    channel.send({embeds: [embed]}).then(msg => {
      msg.react("👍");
      msg.react("👎");
    });
    interaction.reply({content: `> **:white_check_mark: Done added your suggestion in ${channel}**`, ephemeral: true})
    
  }
}