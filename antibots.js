const Discord = require("discord.js");
const guildModel = require("../../models/guilds/guild");

module.exports = {
    name: "guildMemberAdd",
    run: async (member, client) => {
    let data = await guildModel.findOne({ guildID: member.guild.id });
  if(!data) {
    let newData = await guildModel.create({ guildID: member.guild.id });
    newData.save();
    data = await guildModel.findOne({ guildID: member.guild.id });
  }
  console.log(`Hello all`)
    if(!member.user.bot || member.user.id === client.user.id) return;  
    if(data.protect.antibots.onoff === true) { 
      if(data.protect.antibots.trustes.includes(member.id)) return;
      console.log(`Hello all 222222`)
      member.kick(`For the antibots !!`).catch(() => {});
    }
    }
}