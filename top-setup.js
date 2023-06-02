const { MessageEmbed } = require("discord.js");
const userModel = require("../../models/users/user_guild");

module.exports = {
  name: "top-setup",
  permissions: ["ADMINISTRATOR"],
  description: "users top setup !!",
  cooldown: 3000,
  run: async (client, message, args) => {
let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let type = args[1];
    let type1 = args[0];
    
    if(type1 == "reset-all" && !user) {
      userModel.find({guildID: message.guild.id}, async function(err, docs) {
      docs.forEach(async doc => {
        doc.text = 0;
        doc.voice = 0;
        doc.invites = 0;
        doc.invitesArray = [];
        doc.invitesRegular = 0;
        doc.invitesLeaves = 0;
        doc.invitesFake = 0;
        await doc.save();
      });
    });
     message.reply({content: `> **:white_check_mark: Done reset all in the top menu**`});
    } else if(type == "reset-all" && user) {
      let data = await userModel.findOne({guildID: message.guild.id, userID: user.user.id});
      if(!data) {
        let newData = await userModel.create({guildID: message.guild.id, userID: user.user.id});
        await newData.save();
        data = await userModel.findOne({guildID: message.guild.id, userID: user.user.id});
      }
      data.text = 0;
      data.voice = 0;
      data.invites = 0;
      data.invitesArray = [];
      data.invitesRegular = 0;
      data.invitesLeaves = 0;
      data.invitesFake = 0;
      await data.save();
      
     message.reply({content: `> **:white_check_mark: Done reset ${user} in the top menu**`});
    } else if(type1 == "reset-text" && !user) {
      userModel.find({guildID: message.guild.id}, async function(err, docs) {
      docs.forEach(async doc => {
        doc.text = 0;
        await doc.save();
      });
    });
     message.reply({content: `> **:white_check_mark: Done reset all in the top text menu**`});
    } else if(type == "reset-text" && user) {
      let data = await userModel.findOne({guildID: message.guild.id, userID: user.user.id});
      if(!data) {
        let newData = await userModel.create({guildID: message.guild.id, userID: user.user.id});
        await newData.save();
        data = await userModel.findOne({guildID: message.guild.id, userID: user.user.id});
      }
      data.text = 0;
      await data.save();
      
     message.reply({content: `> **:white_check_mark: Done reset ${user} in the top text menu**`});
    } else if(type1 == "reset-voice" && !user) {
      userModel.find({guildID: message.guild.id}, async function(err, docs) {
      docs.forEach(async doc => {
        doc.voice = 0;
        await doc.save();
      });
    });
     message.reply({content: `> **:white_check_mark: Done reset all in the top voice menu**`});
    } else if(type == "reset-voice" && user) {
      let data = await userModel.findOne({guildID: message.guild.id, userID: user.user.id});
      if(!data) {
        let newData = await userModel.create({guildID: message.guild.id, userID: user.user.id});
        await newData.save();
        data = await userModel.findOne({guildID: message.guild.id, userID: user.user.id});
      }
      data.voice = 0;
      await data.save();
      
     message.reply({content: `> **:white_check_mark: Done reset ${user} in the top voice menu**`});
    } else if(type1 == "reset-invites" && !user) {
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
     message.reply({content: `> **:white_check_mark: Done reset all in the top invites menu**`});
    } else if(type == "reset-invites" && user) {
      let data = await userModel.findOne({guildID: message.guild.id, userID: user.user.id});
      if(!data) {
        let newData = await userModel.create({guildID: message.guild.id, userID: user.user.id});
        await newData.save();
        data = await userModel.findOne({guildID: message.guild.id, userID: user.user.id});
      }
      data.invites = 0;
      data.invitesArray = [];
      data.invitesRegular = 0;
      data.invitesLeaves = 0;
      data.invitesFake = 0;
      await data.save();
      
     message.reply({content: `> **:white_check_mark: Done reset ${user} in the top invites menu**`});
    }
  }
}