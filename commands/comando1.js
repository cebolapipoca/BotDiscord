const { SlashCommandBuilder } = require('discord.js');

module.exports = { //exporta um módulo
	data: new SlashCommandBuilder() //determina que a propriedade data terá uma instancia da classe SlashCommandBuilder
		.setName('shadow') //seto o nome do comando
		.setDescription('Safada'), //seto a descrição do comando
	async execute(interaction , user) { //método que determina o que o bot vai fazer. o parametro interection será determinado no evento interectionCreate.

		await interaction.reply("Bom Dia" + user + ', ' + "Você é o ") //ele retorna uma resposta para o bot, nesse caso, um texto.
	},
};