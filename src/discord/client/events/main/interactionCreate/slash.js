const { InteractionType } = require('discord.js');
const client = require('@index');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.type !== InteractionType.ApplicationCommand) return;

        if (!interaction.guild) {
            return interaction.reply({
                ephemeral: true,
                content: `:x: Ouuuu! Aqui não é um servidor, Vaza da minha DM!`
            });
        }

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) {
            return interaction.reply({ content: 'Error', ephemeral: true });
        }

        try {
            await cmd.run(client, interaction);
        } catch (err) {
            console.error('Erro:', err);
            interaction.reply({
                content: ':x: | Ops! Algo deu errado, tente novamente mais tarde!',
                ephemeral: true
            });
        }
    }
};
