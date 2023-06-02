const userModel = require("../../models/users/user_guild");
const premium = require("../../models/premiums");
let bots = [];
premium.find({}, async (err, docs) => docs.forEach(doc => bots.push(doc.id)));

module.exports = {
  name: "voiceStateUpdate",
  run: async (oldMember, newMember, client) => {
    for (id in bots) {
       let member = oldMember.guild.members.cache.get(bots[id]);
       if(member) return;
       }
    let server = client.guilds.cache.get(newMember.guild.id);
    let member = server.members.cache.get(oldMember.id);
    let member_oldchannel = newMember.guild.channels.cache.get(member.voice.channelID)
    let member_newchannel = newMember.guild.channels.cache.get(member.voice.channelID);
    
    
    let data = await userModel.findOne({guildID: newMember.guild.id, userID: member.id});
    if(!data) {
      const newData = await userModel.create({
        guildID: newMember.guild.id,
        userID: member.id
      });
      await newData.save();
      data = await userModel.findOne({guildID: newMember.guild.id, userID: newMember.id});
    }
        var addXP = setInterval(async function () {
           data.voice += 1;
           data.save();
            if (!member_newchannel) {
                clearInterval(addXP);
            }
        }, 60000);
    	
  }
}