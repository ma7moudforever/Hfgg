const userModel = require("../../models/users/user_guild");
const premium = require("../../models/premiums");
//function
function Days(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days
}

let bots = [];
premium.find({}, async (err, docs) => docs.forEach(doc => bots.push(doc.id)));

//export
module.exports = {
  name: "guildMemberRemove",
  run: async (member, client) => {
    for (id in bots) {
       let memberr = member.guild.members.cache.get(bots[id]);
       if(memberr) return;
       }
       
  if(member.bot) return;
  setTimeout(async function() {
  let data = await userModel.findOne({guildID: member.guild.id, userID: member.id});
   if(!data) {
     const newData = await userModel.create({guildID: member.guild.id, userID: member.id});
     data = await userModel.findOne({guildID: member.guild.id, userID: member.id});
   }
  let inviter2 = data.inviterID;
  //if(inviter2 == "") return;
 // if(!inviter2) return;
  const mi = member.guild.members.cache.get(inviter2);
  if(!mi) return;
  let inviterData = await userModel.findOne({guildID: member.guild.id, userID: inviter2});
  if(!inviterData) return; 
  let days = Days(member.user.createdAt);
  data.joined = false;
  data.save();
  if(days < 30) {
   if(inviterData.invitesFake > 0) {
     inviterData.invitesFake -= 1;
   }
   if(inviterData.invites > 0) {
   inviterData.invites -= 1;
   }
   inviterData.invitesLeaves += 1;
   } else {
     
   if(inviterData.invitesReguler > 0) {
   inviterData.invitesReguler -= 1;
   }
   if(inviterData.invites > 0) {
   inviterData.invites -= 1;
   }
   inviterData.invitesLeaves += 1;
   }
   inviterData.save();
  }, 1000);
}
}