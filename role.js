const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "role",
    description: "role someone.",
    permissions: ["MANAGE_ROLES"],
    run: async(client, message, args) => {
        var args = message.content.split(" ");
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
        
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[3]) || message.guild.roles.cache.find(r => r.name == args[3]) || message.guild.roles.cache.find(r => r.name.startsWith(args[3]));       
        if(args[1] === "all") {
          let type = ["add", "remove"];
          if(!args[2]) return message.reply({content: `> **:x: Please select what you want \`add/remove\`**`, allowedMentions: {repliedUser: false}});
          if(!type.includes(args[2])) return message.reply({content: `> **:x: Please select what you want \`add/remove\`**`, allowedMentions: {repliedUser: false}});
          if(args[2] == "add") {
          if(!role) return message.reply({content: `> **:x: I can't find this role**`, allowedMentions: {
            repliedUser: false
            }})
           message.guild.members.cache.filter(m => !m.user.bot).forEach(m => {
             m.roles.add(role);
           });
           message.reply({content: `> **:white_check_mark: Done added \`${role.name}\` to all members**`, allowedMentions: {repliedUser: false}});
          } else if(args[2] == "remove") {
            if(!role) return message.reply({content: `> **:x: I can't find this role**`, allowedMentions: {
              repliedUser: false
              }})
             message.guild.members.cache.filter(m => !m.user.bot).forEach(m => {
               m.roles.remove(role);
             });
             message.reply({content: `> **:white_check_mark: Done removed \`${role.name}\` from all members**`, allowedMentions: {repliedUser: false}});
            }
        } else if(args[1] === "bots") {
            let type = ["add", "remove"];
            if(!args[2]) return message.reply({content: `> **:x: Please select what you want \`add/remove\`**`, allowedMentions: {repliedUser: false}});
            if(!type.includes(args[2])) return message.reply({content: `> **:x: Please select what you want \`add/remove\`**`, allowedMentions: {repliedUser: false}});
            if(args[2] == "add") {
            if(!role) return message.reply({content: `> **:x: I can't find this role**`, allowedMentions: {
              repliedUser: false
              }})
             message.guild.members.cache.filter(m => m.user.bot).forEach(m => {
               m.roles.add(role);
             });
             message.reply({content: `> **:white_check_mark: Done added \`${role.name}\` to all bots**`, allowedMentions: {repliedUser: false}});
            } else if(args[2] == "remove") {
              if(!role) return message.reply({content: `> **:x: I can't find this role**`, allowedMentions: {
                repliedUser: false
                }})
               message.guild.members.cache.filter(m => m.user.bot).forEach(m => {
                 m.roles.remove(role);
               });
               message.reply({content: `> **:white_check_mark: Done removed \`${role.name}\` from all bots**`, allowedMentions: {repliedUser: false}});
              }
        } else {
          role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(r => r.name == args[2]) || message.guild.roles.cache.find(r => r.name.startsWith(args[2]));       
          if(!user) return message.reply({content: `> **:x: I can't find this user**`, allowedMentions: {
            repliedUser: false
            }})
          if(!role) return message.reply({content: `> **:x: I can't find this role**`, allowedMentions: {
            repliedUser: false
            }})
                const botRole = message.guild.me.roles.highest.position;
            const roleToGet = user.roles.highest.position;
           
            if (botRole <= roleToGet) {
                const embed = new MessageEmbed()
                .setDescription("I can't role this member because that member has role position is higher than my role or same as you!")
                .setColor('#e29f07')
                return message.reply({ embeds: [embed] , allowedMentions: {
        repliedUser: false
        }});
            }
              
            let addRoles;
            if (user._roles.includes(role.id)) {
                addRoles = '-'
                user.roles.remove(role, `By: ${message.author.tag}`)
                message.channel.send({ content: `> **✅ Role for ${user}, removed \`${addRoles}${role.name}\`**`, allowedMentions: {
        repliedUser: false
        }}).then(msg => {
                setTimeout(function() {
          //        msg.delete();
                }, 6000);
            });
            } else {
                addRoles = '+'
                user.roles.add(role, `By: ${message.author.tag}`).catch(e => {});
                message.reply({ content: `> **✅ Role for ${user}, added \`${addRoles}${role.name}\`**`, allowedMentions: {
        repliedUser: false
        } }).then(msg => {
                setTimeout(function() {
          //        msg.delete();
                }, 6000);
        });
                }
        }
    }
};