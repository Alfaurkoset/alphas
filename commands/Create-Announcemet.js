const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-announcemet')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply('Hello!');
    },
};