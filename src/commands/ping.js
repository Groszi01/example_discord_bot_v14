const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Displays info about a user')
        .addUserOption(option => option.setName('user').setDescription('The user to show info about')),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);
        // get the users badges
        const badges = await user.fetchFlags();
        // if the user has active developer badge


        console.log(presence)
        const embed = new EmbedBuilder()
            .setTitle(`${user.username}'s info`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'User ID', value: user.id, inline: true },
                      { name: 'Nickname', value: member.nickname || 'None', inline: true },
                      { name: 'Joined server', value: member.joinedAt.toUTCString(), inline: true },
                      { name: 'Joined Discord', value: user.createdAt.toUTCString(), inline: true },
                      { name: 'Roles', value: member.roles.cache.map(role => role.toString()).join(' '), inline: true },


            )


        await interaction.reply({ embeds: [embed] });

    },
};