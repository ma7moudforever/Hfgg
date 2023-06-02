const Discord = require("discord.js")
const userModel = require("../../models/users/user");

module.exports = {
  name: "note",
  description: "note for profile command",
   run: async (client, message, args) => {
     let data = await userModel.findOne({userID: message.member.user.id});
      if(!data) {
          let newData = await userModel.create({userID: message.member.user.id});
          data = await userModel.findOne({userID: message.member.user.id});
      }
    let note = args.slice(0).join(" ");
    
    if(!note) return message.reply({content:"> **:x: Please write the new note**", ephemeral: true});
    if (note.length > 60) return message.reply({content:"> **:x: Your note can only be up to 60 characters**", ephemeral: true});
    
     data.note = note;
     data.save();
     message.reply({content: `> **✅ Your note has been modified**`, allowedMentions: {
        repliedUser: false
        }});
}
};