const guildModel = require("../../models/guilds/guild");

module.exports = {
    name: "prefix",
    run: async(client, message, args) => {
        if(!args[0]) return message.reply({content: `**:x: Please Write The New Prefix**`, allowedMentions: {repliedUser: false}})
        if(args[0].length > 4) return message.reply({content: "**:x: The Prefix More Than 4 Litters**", allowedMentions: {repliedUser: false}})
        let data = await guildModel.findOne({guildID: message.guild.id});
        if(!data) return;
        data.general = {...data.general, prefix:args[0]};
        data.save();
        return message.reply({content: `**:white_check_mark: Done Change The Prefix**`, allowedMentions: {repliedUser: false}})
    }
}