const Discord = require("discord.js");
const client = require('../api/module.js')
const mg = require('mongoose');
mg.set('strictQuery', true);
const username = (client.mongoDB && client.mongoDB.split('://')[1].split(':')[0]) || 'null';

  client.on("ready", () => {
  	const agora = new Date();

    console.log('✅ | API conectada foi: ' + client.user.username + ' ( by: '+ client.author + ' )')
    console.log(`⏰ | Fui ligado às ${agora.getHours()}h ${agora.getMinutes()}m e ${agora.getSeconds()}s`);
    mg.connect(client.mongoDB, {}).then(() => {
      console.log(`📊 | Banco de dados: MongoDB`);
      console.log(`👤 | Nome de usuário da database: ${username}`);
	}).catch((err) => {
      console.log(`❌ | O banco de dados MongoDB não foi configurado!`);
	});

      client.user.setPresence({
        activities: [{ name: 'Olá, sou o(a) ' + client.user.username + '!', type: 4 }],
        status: 'online',
    });
})