const { MessageEmbed } = require("discord.js");
const userModel = require("../../models/users/user.js");

module.exports = {
    name: "coins",
    description: "show coins",
    options: [
        {
            name: "user",
            description: "get user",
            type: "USER",
            required: false,       
        },
        {
            name: "amount",
            description: "amount coins",
            type: "NUMBER",
            required: false,       
        }
    ],
    run: async (client, interaction, args) => {  
      let data = await userModel.findOne({userID: interaction.member.user.id});
      if(!data) {
          let newData = await userModel.create({userID: interaction.member.user.id});
          data = await userModel.findOne({userID: interaction.member.user.id});
      }
      const user = interaction.options.getMember("user");
      const amount = interaction.options.getNumber("amount");
      if(!user && !amount) {
        interaction.reply({content:`> **:credit_card: ${interaction.member.user.username}, has \`${data.coins}\` coins.**`})
      } else if(user && !amount) {
      let data1 = await userModel.findOne({userID: user.id});
      if(!data1) {
          let newData = await userModel.create({userID: user.id});
          data1 = await userModel.findOne({userID: user.id});
      }
          interaction.reply({content:`> **:credit_card: ${user.user.username}, has \`${data1.coins}\` coins.**`})
      } else if(!user && amount) {
          interaction.reply({content: `> **:x: Please mention the user**`, ephemeral: true})
      } else if(user && amount) {
          let data1 = await userModel.findOne({userID: user.id});
          if(!data1) {
           let newData = await userModel.create({userID: user.id});
           data1 = await userModel.findOne({userID: user.id});
          } 
          if(isNaN(amount)) return interaction.reply({content: `> **:x: You can only send numbers**`, ephemeral: true, allowedMentions: {repliedUser: false}})
          if(user.user.bot) return interaction.reply({content: `> **:x: The bots are haven't profile**`, ephemeral: true, allowedMentions: {repliedUser: false}})
          if(amount.toString().includes(".")) return interaction.reply({content: `> **:x: You can't send decimal numbers**`, ephemeral: true, allowedMentions: {repliedUser: false}})
          if(amount.toString().includes("-")) return interaction.reply({content: `> **:x: You can't send negative numbers**`, ephemeral: true, allowedMentions: {repliedUser: false}})
          //if(amount.toString().includes("+")) return message.reply({content: `please delete +`, ephemeral: true});
          if(user.id === interaction.member.user.id) return interaction.reply({content: `> **:x: You want to be send the coins to yourself ?**`, ephemeral: true, allowedMentions: {repliedUser: false}})
          if(data.coins < amount) return interaction.reply({content: `> **:x: You don't have this money`, ephemeral: true, allowedMentions: {repliedUser: false}})
          let tax = Math.floor(amount * (3 / 100));
          let first = Math.floor(Math.random() * 10);
          let second = Math.floor(Math.random() * 10);
          let third = Math.floor(Math.random() * 10);
          let fourth = Math.floor(Math.random() * 10);
          let num = `${ first }${ second }${ third }${ fourth }`;
          let resulting = Math.floor(amount-(amount*(3/100)));
          let embed = new MessageEmbed()
          .setDescription(`**${interaction.member.user.username}, Transfer Fees \`${tax}\`, Amount :\`${resulting}\` **
   type these numbers to confirm : \`${num}\``);
          interaction.reply({embeds: [embed]});
          let filter = i => {
               return i.author.id === interaction.member.user.id;
          }
          interaction.channel.awaitMessages({
                filter,
                max: 1,
                time: 300000,
                errors: ["time"]
              }).then(collected => {
                if (collected.first().content === num) {
                    interaction.deleteReply();
                    collected.first().delete();
                    const minus = data.coins -  parseInt(amount);
                    const plus = data1.coins + parseInt(resulting);
                    
                    data1.coins = plus;
                    data1.save();
                    
                    data.coins = minus;
                    data.save();
                    interaction.followUp({content: `> **:credit_card: Done send \`${resulting}\` to <@${user.id}>**`});                   
                } else {
                    interaction.deleteReply();
                    collected.first().delete();
                }
              });
      }
    } 
}