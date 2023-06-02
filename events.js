const fs = require('fs');

module.exports = async (client) => {
    try {
    fs.readdirSync('./events').forEach((folder) => {
        const commandFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));
        for (file of commandFiles) {
            let event = require(`../events/${folder}/${file}`);
            if(event.name && event.run) {
              if(event.once) {
                client.once(event.name, (...args) => event.run(...args, client));
              } else {
                
              client.on(event.name, (...args) => 
                
                event.run(...args, client));
              }
           } else {
              continue;
           }
        }
    });
    console.log(`"Events" is ready`);
} catch (e) {
    console.log(e);
}
}
