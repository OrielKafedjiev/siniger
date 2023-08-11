const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('resumes the current song'),
    async execute(interaction){
        try{
        Player.unpause();
        interaction.reply("resumed!")
        }catch(err){
            console.log(err)
            
        }
    }
}