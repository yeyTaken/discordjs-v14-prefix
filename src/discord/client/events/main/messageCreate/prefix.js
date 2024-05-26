const client = require("@index");
const { ChannelType } = require("discord.js");
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: 'messageCreate',
    async execute(message) {

        const prefix = await db.get('prefixset_' + message.guild?.id) || client.prefix;

        if (message.author.bot) return;
        if (message.channel?.type === ChannelType.DM) return;

        const content = message.content?.trim();
        if (!content?.toLowerCase().startsWith(`${prefix.toLowerCase()}`)) return;

        const args = content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;
        let command = client.commands.get(cmd);
        if (!command) command = client.commands.get(client.aliases.get(cmd));

        try {
            await command.run(client, message, args);
        } catch (err) {
            message.channel.send(':x: | Ops! ' + message.author + ', algo deu errado, tente novamente mais tarde!');
            console.error('Erro:', err);
        }
    }
}
