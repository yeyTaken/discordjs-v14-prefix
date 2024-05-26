const client = require("@index");
require('dotenv').config();

module.exports = {
  name: 'ready',
  once: true,
  execute() {
    const now = new Date();

    console.log(`✅ | O app conectado foi: ${client.user.username} ( by: ${client.author} )`)
    console.log(`⏰ | App ligado às ${now.getHours()}h ${now.getMinutes()}m e ${now.getSeconds()}s`);

    client.user.setPresence({
      activities: [{ name: `Olá, sou o(a) ${client.user.username}!`, type: 4 }],
      status: 'online',
    });

  }
}
