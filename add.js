const Discord = require("discord.js");
const userModel = require("../../models/users/user");

module.exports = {
    name: "add",
    description: "add coins or level",
    devs: true,
     run: async (client, message, args) => {
       var args = message.content.split(" ");
       message.delete();
       let type_all = ["coins", "level", "likes"];
       let type = args[2];
       let amount = args[3];
      
       let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
       if(!user) return message.reply({content: `> **:x: Please mention user**` , allowedMentions: {repliedUser: false}}); 
       if(user.bot) return message.reply({content: `the bots not have profile!` , allowedMentions: {repliedUser: false}});
       let data = await userModel.findOne({userID: user.id});
       if(!data) {
        let newData = await userModel.create({userID: user.id});
        data = await userModel.findOne({userID: user.id});
       }
       if(!type) return message.reply({content: `> **:x: Please write the type**` , allowedMentions: {repliedUser: false}}); 
       if(!amount) return message.reply({content: `> **:x: Please write the amount**` , allowedMentions: {repliedUser: false}}); 
       if(isNaN(amount)) return message.reply({content: `> :x: | Please send numbers`, allowedMentions: {repliedUser: false}})
       console.log(type, amount)
       if(user && type === "coins") {
         data.coins += parseInt(amount);
         message.channel.send({content: `Done added \`${amount}\` coins to ${user}`}).then(msg => {
           setTimeout(function() {
             msg.delete();
           }, 3000);
         });
       } else if(user && type === "level") {
         if(amount > 100) return message.channel.send({content: `the amount than 100`,ephemeral: true}).then(msg => {
           setTimeout(function() {
             msg.delete();
           }, 3000);
         });
         data.level += parseInt(amount);
         message.channel.send({content: `Done added \`${amount}\` level to ${user}`}).then(msg => {
           setTimeout(function() {
             msg.delete();
           }, 3000);
         });
       } else if(user && type === "likes") {
         data.likes += parseInt(amount);
         message.channel.send({content: `Done added \`${amount}\` likes to ${user}`}).then(msg => {
           setTimeout(function() {
             msg.delete();
           }, 3000);
         });
       }
       data.save();
     }
    }