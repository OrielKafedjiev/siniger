const { SlashCommandBuilder, EmbedBuilder, ConnectionService } = require('discord.js')
const { joinVoiceChannel, VoiceConnectionStatus, createAudioPlayer, createAudioResource, NoSubscriberBehavior, AudioPlayerStatus } = require('@discordjs/voice');
require('dotenv').config();
const play = require('play-dl');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('plays a song with a provided youtube link')
        .addStringOption(option => option.setName('input')
            .setDescription('Name of song or link (yt)')
            .setRequired(true)),

    async execute(interaction){
        const s = interaction.options.getString('input');
        const UserId = interaction.user.id;
        Music.GuildId = interaction.guild.id;
        Music.Guild = client.guilds.cache.get(Music.GuildId)
        const Member = Music.Guild.members.cache.get(UserId);
        const channel = interaction.channel;
        Music.ChannelId = Member.voice.channel.id;
        Connection = joinVoiceChannel({
            channelId: Music.ChannelId,
            guildId: Music.GuildId,
            adapterCreator: Music.Guild.voiceAdapterCreator,
        });
        Player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play,
            },
        });

        let yt_info = await play.search(s, {
            limit:1
        })
            await Music.queue.push(yt_info[0].url)
            await Music.names.push(yt_info[0].title)
            await Music.images.push(yt_info[0].thumbnails[0].url)
            let embed = new EmbedBuilder()
                        .setColor('#3498DB')
                        .setTitle('Successfully added:')
                        .addFields(
                            { name: 'Name: ',value: Music.names[Music.names.length-1]},
                            { name: 'Link: ',value: Music.queue[Music.queue.length-1]},
                        )
                        .setImage(Music.images[Music.images.length-1])
            await channel.send({embeds: [embed]})
                
            const playMusic = async () => {
                try{
                    console.log("playing music now")
                    let stream = await play.stream(Music.queue[Music.current])
                    let resource = createAudioResource(stream.stream, {inputType: stream.type});
                    Player.play(resource);
                    Subscription = Connection.subscribe(Player);
                    let embed = new EmbedBuilder()
                        .setColor('#3498DB')
                        .setTitle('Now playing:')
                        .addFields(
                            { name: 'Name: ',value: Music.names[Music.current]},
                            { name: 'Link: ',value: Music.queue[Music.current]},
                        )
                        .setImage(Music.images[Music.current])
                        await channel.send({embeds: [embed]})
                }catch(err){
                    console.log(err)
                }
            }
            Connection.on(VoiceConnectionStatus.Ready, async () => {
                console.log('The connection has entered the Ready state - ready to play audio!');
                await playMusic()

            });
       
        
        Player.on(AudioPlayerStatus.Idle, async () => {
            Music.current++
            if(Music.current < Music.queue.length){
                playMusic()
            }else{
                try{
                console.log("called at play")
                    resetMusic(interaction);
                }catch(err){
                    console.log(err);
                }
            }
        })
    }
}