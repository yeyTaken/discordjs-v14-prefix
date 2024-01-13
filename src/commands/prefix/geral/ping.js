const Discord = require("discord.js")

module.exports = {
    name: "ping", 
    aliases: ["p"],
    
    run: async(client, message, args) => {
      message.reply(`- :ping_pong: **Ping**: \`${client.ws.ping}\`ms`)
}
}