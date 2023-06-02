const Discord = require('discord.js');
const os = require("os");
const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, Permissions, Client} = require("discord.js");

module.exports = {
    name: 'ping',
    description: 'Show Bot Ping',
    cooldown: 5000,
    run: async(client, interaction) => {
     const totalram = ((os.totalmem() / 10**6 + " ").split('.')[0]);
      let ping = new Discord.MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setTitle(`🏓 Pong`)
      .addField(`**Bot Usage**`,
      `Time Taken: ${Date.now() - interaction.createdTimestamp}ms\nDiscord API: ${client.ws.ping}ms\nRAM: ${totalram}mb`)
      .setColor('e29f07')
      .setTimestamp()
      .setFooter(`${interaction.guild.name}`, interaction.guild.iconURL({dynamic: true})) 
      const row = new MessageActionRow()
        .addComponents(new MessageButton()
	      .setDisabled(true)
        .setCustomId('primary')
        .setStyle('DANGER')
        .setLabel(`Requested by ${interaction.user.tag}`));

      interaction.reply({embeds : [ping],components: [row]})
    }
};