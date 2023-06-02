module.exports = {
  name: "leave",
  description: "Leaves a guid by the Id",
  devs: true,
  run: async(client, message, args) => {
    try {
      let id = args[0];
      if(!id) return message.reply({content: `Please write the guild id !!`})
      const guild = client.guilds.cache.get(id);
      if (!guild)
        return message.reply({content:`No guild was found with id \`${id}\`.`, ephemeral: true});
      await guild.leave();
      return message.reply({content:`Left **${guild.name}** guild .`});
    } catch (error) {
      return message.reply({content:`${error.message}`});
    }
  }
};