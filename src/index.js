const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]
})

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, async c => {

    console.log('Logged in as', c.user.tag);

    try {
        const commands = await client.application.commands.fetch();
        console.log('Slash commands loaded:', commands.size)
        for (const command of client.commands.values()) {
            const fetchedCommand = commands.find(cmd => cmd.name === command.data.name);

            if (!fetchedCommand) {
                await client.application.commands.create(command.data);
            } else {
                await client.application.commands.edit(fetchedCommand.id, command.data);
            }
        }
        console.log('Slash commands registered!');
    } catch (error) {
        console.error('Error registering slash commands:', error);
    }
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    const command = client.commands.get(commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error('Error executing command:', error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});



client.login(token);