//Discord
const Discord = require("discord.js");

//Variables
const userModel = require("../../models/users/user");
const { numFormat } = require("../../functions/nFormat");

//Canvas
const Canvas = require("canvas");
const { registerFont } = require("canvas")
registerFont('./fonts/Roboto-Bold.ttf', { family: 'arl' })
const editor = require("editor-canvas");

//Export
module.exports = {
    name: "profile",
    description: "get users profile!",
    permissions: [],
    run: async (client, message, args) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(user.bot) return message.reply({content: `> **:x: The bots are haven't profile**`, ephemeral: true});
     let data = await userModel.findOne({userID: user.id});
     if(!data) {
       let newData = await userModel.create({userID: user.id});
       data = await userModel.findOne({userID: user.id});
     }
    const canvas = Canvas.createCanvas(512, 512)
    const ctx = canvas.getContext('2d')
    var title = data.note || "";
    let words = editor.splitText(ctx, { text: title, width: 200, maxLine: 3 });
    await message.channel.sendTyping();
    var bg = null;//In later edit and add user background database
if(bg == null) bg = "https://i.imgur.com/980D92a.png"
const background = await Canvas.loadImage(bg)
const bg2 = await Canvas.loadImage('https://i.imgur.com/LJkFplX.png')
const avatar = await Canvas.loadImage(user.user.displayAvatarURL({ format: "png"}));

let username = user.user.username;
if(username.length > 7) username = username.substr(0,7) +"..."
let fontSize = 18.6;
let userfont = 50;
let titfo = 18.6
let xpx = 21
let type = 25

ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
ctx.drawImage(bg2, 0, 0, canvas.width, canvas.height);
ctx.fillStyle = '#ffffff';
ctx.font = `${userfont}px arl`;
ctx.fillText(username, 200, 130);

ctx.font = `22px arl`
ctx.fillText(data.likes, 444, 44)

ctx.fillStyle = '#444444';


ctx.font = `${fontSize}px arl`;
ctx.fillText(data.level, canvas.width / 3.400, canvas.height / 1.98);
ctx.fillStyle = '#444444';

ctx.fillText(numFormat(data.coins,2) , canvas.width / 3.600, canvas.height / 2.44);
ctx.fillText(`${data.xp}` , canvas.width / 3.260, canvas.height / 1.66);
ctx.font = `${titfo}px arl`;


ctx.fillText(words , canvas.width / 5.930, canvas.height / 1.25);



ctx.beginPath();
ctx.arc(113.4, 98.1, 62.7, 0, 2 * Math.PI);
  ctx.closePath();
    ctx.clip();
ctx.drawImage(avatar, 48, 33, 130, 130)

      const att = new Discord.MessageAttachment(canvas.toBuffer(), `profile.png`)
      message.reply({files: [att], allowedMentions: {
        repliedUser: false
    }})     

}
}