const { MessageEmbed } = require("discord.js");
const guildModel = require("../../models/guilds/giveaways");

module.exports = {
  name: "end",
  description: "giveaway end !!",
  permissions: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
    let messageFetch = args[0];
    let data = await guildModel.findOne({guildID: message.guild.id, messageID: messageFetch });
    if(!data) return message.reply({content:`**> :x: This message is not giveaway**`});
    
    let giveawayChannel = message.guild.channels.cache.get(data.channelID)
    if(!giveawayChannel) return message.reply({content: `**> :x: I can't find this giveaway message channel**`});
    
   await giveawayChannel.messages.fetch(messageFetch).then(msg => {
   if (msg.author.id != client.user.id) return message.reply({content: `**> :x: This is not a giveaway message**`, ephemeral: true});
   if (!msg.content.startsWith(`**🎉 GIVEAWAY`)) return message.reply({content: `**> :x: This is not a giveaway message**`,ephemeral: true});
   if (msg.content == `**🎉 GIVEAWAY ENDED 🎉**`) return message.reply({content: `**> :x: The giveaway is already ended**`, ephemeral: true});
   if (msg.reactions.cache.size < 1) return message.reply({content:`**> :x: I can't find reactions in this message**`, ephemeral: true});
   if (msg.reactions.cache.filter(a => a.emoji.name == "🎉").map(reaction => reaction.count)[0] <= 1) return message.reply({content: `**> :x: I can't find reactions in this message**`,ephemeral: true});
   
   let rusers = msg.reactions.cache.map(r => r.users.cache.filter(u => !u.bot).random(parseInt(data.wins)));
   
   let embed2 = new MessageEmbed()
    .setColor("RED")
    .setAuthor(data.prize)
    .setFooter(`Ended at`);
    msg.reactions.cache.filter(a => a.emoji.name == "🎉").map(r => r.users.fetch().then(async u => {
       let rusers = u.filter(user => !user.bot).random(parseInt(data.wins));
        msg.edit({content:`**🎉 GIVEAWAY ENDED 🎉**`,
            embeds: [
               embed2
               .setTimestamp()
               .setDescription(`Hosted by: <@${data.hostedID}>
Winners:\n${rusers || "No winners"}`)
                ]});
                
           
         if (msg.reactions.cache.filter(a => a.emoji.name == "🎉").map(reaction => reaction.count)[0] <= 1
                ) {
                  message.reply({content: `Done ended the giveaway.`})
                  message.deleteReply();
                   giveawayChannel.send({content: `No winners :rolling_eyes:`});
                   data.endedWins = [];
                   data.ended = true;     
                } else {
                  message.channel.send({content: `Done ended the giveaway.`}).then((mssg) => {
                    setTimeout(function() {
                      mssg.delete();
                    }, 4000);
                  });
                message.delete();
                  giveawayChannel.send({content:
                    `> 🎉 Congratulations ${rusers}! You won the **${data.prize}**`});
                let userss = [];
                rusers.map(u => {
                  userss.push(`${u.tag} [${u.id}]`)
                })
                data.endedWins = userss;
                data.ended = true;     
                }
               data.save();        
              })
            );
   
   
        }).catch(err =>
          message.reply({content: `I can't find this msg.`, ephemeral: true})
          );
         
    }
  }