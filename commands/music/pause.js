const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('pauses current song'),
    async execute(interaction){
        Player.pause();
        interaction.reply("paused!")
        
    }
}