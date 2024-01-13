const client = require("../api/module");
const Discord = require("discord.js");
const User = require('../database/schemas/User');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

client.on("messageCreate", async (message) => {

    const member = message.guild.members.cache.get(message.author.id);
    const user = await User.findOne({ idU: message.author.id });

    if (!user) {
       return;
        await User.create({
            idU: message.author.id,
            registrado: true
        });
    }
    const prefix = await db.get('prefixset_' + message.guild.id) || client.prefix;

    if (message.author.bot) return;
    if (message.channel.type === Discord.ChannelType.DM) return;

    const content = message.content.trim(); // Remove espaços em branco no início e no final da mensagem
    if (content.toLowerCase().startsWith(`${prefix.toLowerCase()} `)) return;

    const args = content.slice(prefix.length).trim().split(/ +/g);

    let cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    try {
        command.run(client, message, args);
    } catch (err) {
        message.channel.send(':x: | Ops! ' + message.author + ' Algo deu errado, tente novamente mais tarde!')
        console.error('Erro:' + err);
    }
});