const fs = require('node:fs');
const path = require('node:path');
const {Client, Events, GatewayIntentBits, Collection} = require('discord.js');
require('dotenv').config();

global.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates ] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
global.Connection;
global.Player
global.Subscription
global.Music = {
    ChannelId: null,
    GuildId: null,
    Guild: null,
    queue: [],
    names: [],
    images: [],
    current: 0,
    looped: false,
    shuffled: false
}

for (const folder of commandFolders){
    const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for(const file of commandFiles){
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if('data' in command && 'execute' in command){
            client.commands.set(command.data.name, command);
        }else{
            console.log(`The command at ${filePath} is missing 'data' or 'execute'`);
        }
    }
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if(!command){
        console.log(`No command matching ${interaction.commandName} was found`)
        return;
    }
    try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

global.resetMusic = async (interaction) => {
    try{
        Music.ChannelId =  null
        Music.GuildId =  null
        Music.Guild = null
        Music.queue = []
        Music.names = []
        Music.current = 0
        Music.images = []
        Music.looped = false
        Music.shuffled = false
        if(Connection){
            Connection.destroy();
        }
        await interaction.channel.send("Nothing left to play, leaving!");
        
    }catch(err){
        console.log(err);
        return;
    }
}

client.login(process.env.DISCORD_TOKEN);

