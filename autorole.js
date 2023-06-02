const { CommandInteraction, Client} = require("discord.js");
const { MessageEmbed } = require("discord.js");
const guildModel = require("../../models/guilds/guild");

module.exports = {
    name: "autorole",
    description: "auto role for members !",
    permissions : ["MANAGE_GUILD"],
    options: [
         {
            name: "type",
            description: "auto role type !",
            type: 3,
            required: true,
            choices: [{
                name: "on",
                value: "on"
            },
            {
                name: "off",
                value: "off"
           },
           {
                name: "add",
                value: "add"          
           },
           {
                name: "remove",
                value: "remove"     
           },
           {
                name: "remove all",
                value: "remove-all"     
            },
            {
                name: "list",
                value: "list"     
            }]
        },
        {
            name: "role",
            description: "get role!",
            type: "ROLE",
            required: false,       
        }],      
    run: async (client, interaction, args) => {
       let type = interaction.options.getString("type");
       let role = interaction.options.getRole("role");
       let data = await guildModel.findOne({ guildID: interaction.guild.id });
        if(!data) {
          let newData = await guildModel.create({ guildID: interaction.guild.id });
          newData.save();
          data = await guildModel.findOne({ guildID: interaction.guild.id });
        }
        if(type === "on") {
          data.autorole = {
            roles: data.autorole.roles,
            onoff: true
          }
          interaction.reply({content: `> **:white_check_mark: Done! the autorole is now on**`})
        } else if(type === "off") {
          data.autorole = {
            roles: data.autorole.roles,
            onoff: false
          }
          interaction.reply({content: `> **:white_check_mark: Done! the autorole is now off**`})
        } else if(type === "add") {
         if(!role) return interaction.reply({content: `> **:x: Please mention the role**`, ephemeral: true});
         let botRole = interaction.guild.members.cache.get(client.user.id).roles.highest;
         if(role.position > botRole.position) return interaction.reply({content: `> **:x: I can't add this role because this role position more than my role position**`})
         if(data.autorole.roles.includes(role.id)) return interaction.reply({content: `> **:x: This role already exists**`, ephemeral: true});
          let roles = [...data.autorole.roles, role.id];
          data.autorole = {
            roles: roles,
            onoff: data.autorole.onoff
          }
          interaction.reply({content: `> **:white_check_mark: Done added \`${role.name}\` to autoroles menu**`});
        } else if(type === "remove") {
          if(!role) return interaction.reply({content: `**> :x: Please mention the role**`, ephemeral: true})  
          if(!data.autorole.roles.includes(role.id)) return interaction.reply({content: `**> :x: This role not exists in autorole menu**`, ephemeral: true});
          let roleIndex = data.autorole.roles.indexOf(role.id);
          let roles = [...data.autorole.roles.filter((_, index) => index !== roleIndex)];
          data.autorole = {
            roles: roles,
            onoff: data.autorole.onoff
          }
           interaction.reply({content: `> **:white_check_mark: Done removed \`${role.name}\` from autoroles menu**`});
        } else if(type === "remove-all") {
         data.autorole = {
            roles: [],
            onoff: data.autorole.onoff
          }
         interaction.reply({content: `> **:white_check_mark: Done removed all roles from autoroles menu**`});
        } else if(type === "list") {
          let list = [];
          interaction.guild.roles.cache.forEach(r => {
            data.autorole.roles.forEach(rdata => {
              if(rdata === r.id) list.push(`${r.name} [${r.id}]`)
            });
          });
          let embed = new MessageEmbed()
          .setDescription(`${list.join("\n") || `nothing`}`);
           interaction.reply({embeds: [embed]});
        }
        await data.save();
    }
}