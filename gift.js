const { CommandInteraction, Client} = require("discord.js");
const Discord = require("discord.js");
const userModel = require("../../models/users/user");
const { getTime } = require("../../functions/getTime.js")

module.exports = {
    name: "gift",
    description: "get your gift",
    run: async (client, interaction, args) => {  
      let data = await userModel.findOne({userID: interaction.member.user.id});
      if(!data) {
          let newData = await userModel.create({userID: interaction.member.user.id});
          data = await userModel.findOne({userID: interaction.member.user.id});
      }
     let amount = Math.floor(Math.random() * 2000) + 400;
     let timeout = 86400000;
     let giftTime = data.giftTime;
     if (giftTime !== null && timeout - (Date.now() - giftTime) > 0) {
    let time = getTime(timeout - (Date.now() - giftTime));
    return interaction.reply({content: `> **:credit_card: You've already collected your gift\n> :timer: Please try again in: \`${time}\`**`, ephemeral: true});
     } else {
         data.coins += amount;
         data.giftTime = Date.now();
         data.save();
         return interaction.reply({content: `> **:credit_card: You've collected your gift \`${amount}\`**`, ephemeral: true})
     }
    }
}