const userModel = require("../../models/users/user_guild");
const premium = require("../../models/premiums");
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
    //Set Time Out.
    setTimeout(async function() {
      //Member Data
      let data = await userModel.findOne({guildID: member.guild.id, userID: member.id});
     if(!data) {
     const newData = await userModel.create({guildID: member.guild.id, userID: member.id});
     data = await userModel.findOne({guildID: member.guild.id, userID: member.id});
   }
   
   data.joined = false;
   await data.save();
    }, 2000);
    
    
  }
}