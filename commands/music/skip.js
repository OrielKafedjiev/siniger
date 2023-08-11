const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('skips the current song'),
    async execute(interaction){
        Player.stop();
        Subscription.unsubscribe()
        interaction.reply("skipped")
    }
}