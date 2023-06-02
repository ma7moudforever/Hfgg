const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const moment = require('moment');

module.exports = {
 name: "user",
 permissions: [""],
 description: "Userinfo of mentioned user",
run: async(client,message,args) => {
  try {
   let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
   
    let muted = false;
    if(member.roles.cache.find(r => r.name === "Muted")) {
        muted = true;
    } else {
        muted = false;
    }
      const embed = new MessageEmbed()  
      .setThumbnail(member.displayAvatarURL({dynamic: true, size: 1024,format: "png"}))
      .setColor("RANDOM")
     .addField(`**General**`,`- Username: ${member.user.tag}
- ID: ${member.user.id}
- Nickname: ${member.displayName}
- Created: ${moment(member.user.createdAt).format('LL')} [${moment(member.user.createdAt).fromNow()}]
- Joined: ${moment(member.joinedAt).format('LL')} [${moment(member.joinedAt).fromNow()}]`)
      .addField(`**Statistics**`, 
`- Bot: ${member.user.bot ? true : false}
- Muted: ${muted}
- Roles: ${member.roles.cache.filter(r => r.name != "@everyone").size}
- Highest Role: ${member.roles.highest}`)
 const row = new MessageActionRow()
        .addComponents(new MessageButton()
        .setStyle('LINK')
        .setURL(member.user.displayAvatarURL({ dynamic: true }))
        .setLabel('User Avatar')
        )
        .addComponents(new MessageButton()
        .setDisabled(true)
        .setCustomId('primary')
        .setStyle('DANGER')
        .setLabel(`Requested by ${message.author.tag}`))
   
   message.reply({embeds: [embed], components: [row], allowedMentions: {
        repliedUser: false
    }});
   
  } catch (err) {
    message.reply({content: `Sorry! Please try again.`});
    console.log(err)
  }
  }
 }