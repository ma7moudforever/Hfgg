const { MessageEmbed } = require("discord.js");
const userModel = require("../../models/users/user_guild");

module.exports = {
  name: "invites-setup",
  permissions: ["ADMINISTRATOR"],
  description: "get users invites !!",
  cooldown: 3000,
  run: async (client, message, args) => {
    
    let type = args[0];
    let type1 = args[1];
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    
    if(type == "reset" && !user) {
      userModel.find({guildID: message.guild.id}, async function(err, docs) {
      docs.forEach(async doc => {
        doc.invites = 0;
        doc.invitesArray = [];
        doc.invitesRegular = 0;
        doc.invitesLeaves = 0;
        doc.invitesFake = 0;
        await doc.save();
      });
    });
     message.reply({content: `> **:white_check_mark: Done reset all invites**`});
    } else if(type1 == "reset" && user) {
      let data = await userModel.findOne({guildID: message.guild.id, userID: user.user.id});
      if(!data) {
        const newData = await userModel.create({guildID: message.guild.id, userID: user.user.id});
        await newData.save();
        data = await userModel.findOne({guildID: message.guild.id, userID: user.user.id});
      }
      
      data.invites = 0;
      data.invitesArray = [];
      data.invitesRegular = 0;
      data.invitesLeaves = 0;
      data.invitesFake = 0;
      await data.save();
      message.reply({content: `> **:white_check_mark: Done reset ${user} invites**`});
    } else {
      message.reply({content: `> **:x: You are using this cmd incorrectly,\n> so go to the help menu and show how to use this command**`});
    }
  }
}