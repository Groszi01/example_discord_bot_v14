const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Replies with user info!')
        .addUserOption(option => option.setName('user').setDescription('The user to show info about')),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        // add a custom guild id to the bot

        const embed = new EmbedBuilder()
            .setTitle('Everything we know about this ' + (user.bot ? 'bot' : 'user') + '!')
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        if (user.bot) {
            // get if its has the supports slash commands badge



            embed.setColor('#d9d9d9')
            embed.addFields({ name: "Bot", value: `${user}`, inline: false})
            embed.addFields({ name: "Joined the server", value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: true})
            embed.addFields({ name: "Joined Discord", value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: true})
            embed.setFooter({ text: `ID: ${user.id}` })
            embed.setTimestamp()
        } else {
            const user = interaction.options.getUser('user') || interaction.user;
            const member = await interaction.guild.members.fetch(user.id);
            const tag = user.tag;

            embed.setColor('#5dd969')
            embed.addFields({ name: "Member", value: `${user}`, inline: false})
            embed.addFields({ name: "Roles", value: `${member.roles.cache.map(r => r).join(' ')}`, inline: false})
            embed.addFields({ name: "Badges", value: ``, inline: false})
            embed.addFields({ name: "Joined the server", value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, inline: true})
            embed.addFields({ name: "Joined Discord", value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: true})
            embed.setFooter({ text: `ID: ${user.id}` })
            embed.setTimestamp()

        }

        await interaction.channel.send({ embeds: [embed] });
    }
};