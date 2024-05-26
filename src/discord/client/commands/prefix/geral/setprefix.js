const Discord = require("discord.js");
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "setprefix",
    aliases: ["st", "configprefix", "cf"],
    
    run: async (client, message, args) => {
        if (!message.member.permissions.has(Discord.PermissionFlagsBits.Administrator))  {
            return message.reply(`:x: | Ops! ${message.author}, Você não tem permissão para usar este comando.`);
        }


	    const prefix = await db.get('prefixset_' + message.guild.id) || client.prefix;
        if (!args[0]) {
            return message.reply(`:x: | Por favor, forneça um novo prefixo: \`${prefix}\`.`);
        }

        await db.set('prefixset_' + message.guild.id, args[0]);
        message.reply(`:white_check_mark: | Prefixo definido por: ${message.author}, novo prefix: \`${args[0]}\`.`);
    }
};
