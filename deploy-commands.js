const { clientId, guildId, token } = require('./config.json');

const { REST, Routes } = require('discord.js');
const comandos = require("./commands/comando1");
let ComandosTotal = comandos.data.toJSON();

const rest = new REST();

rest.setToken(token);

(async() => {
try 
{
    await rest.post(Routes.applicationGuildCommands(clientId, guildId) , 
    {
        'body': ComandosTotal,
    })

    console.log("Deu bom")
}catch {
    console.log("deu error")
}
    
})();