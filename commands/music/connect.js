const { SlashCommandBuilder, User } = require('discord.js')
const { joinVoiceChannel } = require('@discordjs/voice');
const { getVoiceConnection } = require('@discordjs/voice');

require('dotenv').config();


module.exports = {
    data: new SlashCommandBuilder()
        .setName('connect')
        .setDescription('connects to the voice channel of the sender'),
    async execute(interaction){
        const UserId = interaction.user.id;
        Music.GuildId = interaction.guild.id;
        Music.Guild = client.guilds.cache.get(Music.GuildId)
        const Member = Music.Guild.members.cache.get(UserId);
        Music.ChannelId = Member.voice.channel.id;
        
        const connection = joinVoiceChannel({
            channelId: Music.ChannelId,
            guildId: Music.GuildId,
            adapterCreator: Music.Guild.voiceAdapterCreator,
        });

    }

    
}