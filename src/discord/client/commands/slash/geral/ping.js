module.exports = {
    name: 'ping',
    description: 'veja meu ping!',

    run: async (client, interaction) => {
        interaction.reply({
            ephemeral: true, content: `- :ping_pong: **Ping**: \`${client.ws.ping}\`ms`,
        })
    }
}