const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('disconnect')
        .setDescription('disconnects from the current channel'),
    async execute(interaction){

        console.log("called at disconnect")
        
    }
}