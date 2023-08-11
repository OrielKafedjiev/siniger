const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('replies with pong'),
    async execute(interaction){
        const embed = new EmbedBuilder()
            .setColor('#3498DB')
            .setTitle('Pong!')
            .addFields(
                { name: 'Latency ',value: `${Date.now() - interaction.createdTimestamp}ms.`},
                { name: 'API Latency ',value: `${Math.round(client.ws.ping)}ms.`},
            )
        await interaction.reply({embeds: [embed]})
    }

    
}