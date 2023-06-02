const { Permissions } = require("discord.js");
const Discord = require("discord.js");
const guildModel = require("../../models/guilds/guild");
const userModel = require("../../models/users/user_guild");
const premium = require("../../models/premiums");
let bots = [];
premium.find({}, async (err, docs) => docs.forEach(doc => bots.push(doc.id)));

module.exports = {
    name: "roleUpdate",
    run: async (oldRole,newRole, client) => {
      for (id in bots) {
       let member = oldRole.guild.members.cache.get(bots[id]);
       if(member) return;
       }
        let guild = await guildModel.findOne({ guildID: oldRole.guild.id });
  if(!guild) {
    let newData = await guildModel.create({ guildID: oldRole.guild.id });
    newData.save();
    guild = await guildModel.findOne({ guildID: oldRole.guild.id });
  }
    	if(guild.protect.role.onoff === true) {
           const entry = await oldRole.guild.fetchAuditLogs().then(audit => audit.entries.first());
           const en2 = entry.executor;
          if(!en2 || guild.protect.whiteList.trustes.includes(en2.id) ||en2.id === oldRole.guild.ownerId || en2.id === client.user.id ) return; 
          let user = await userModel.findOne({ userID: en2.id, guildID: oldRole.guild.id});
         if(!user) {
         let newData = await userModel.create({ userID: en2.id, guildID: oldRole.guild.id });
        newData.save();
        user = await userModel.findOne({ userID: en2.id, guildID: oldRole.guild.id });
     }
user.roleE += 1;
user.save();
 if(user.roleE >= guild.protect.role.limit) {
   
if(guild.protect.role.punishment === "removeRole") {
  let memb = oldRole.guild.members.cache.get(en2.id);
    if(memb) {
  oldRole.guild.members.cache.get(en2.id).roles.cache.filter(r => r.name != "@everyone").forEach(rol => {
oldRole.guild.members.cache.get(en2.id).roles.remove(rol);
});
}

} else if(guild.protect.role.punishment === "kick") {
  let memb = oldRole.guild.members.cache.get(en2.id);
    if(memb) {
  oldRole.guild.members.cache.get(en2.id).kick();
    }
} else if(guild.protect.role.punishment === "ban") {
  let memb = oldRole.guild.members.cache.get(en2.id);
    if(memb) {
  oldRole.guild.members.cache.get(en2.id).ban();
    }
}
   
   
  }
        if(oldRole.name !== newRole.name) {
          newRole.setName(oldRole.name);
        } else if(oldRole.permissions !== newRole.permissions) {
        	newRole.setPermissions(oldRole.permissions);
        } else if(oldRole.color !== newRole.color) newRole.setColor(oldRole.color)
        
      }
    }
}