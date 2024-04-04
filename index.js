const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits , REST, GuildChannelManager, GuildChannel} = require('discord.js');
const {ChannelsAPI} = require('@discordjs/core');
const { token } = require('./config.json');
const { EventEmitter } = require('node:events');
const sla = require('@discordjs/rest')



const client = new Client({ intents: [GatewayIntentBits.Guilds , GatewayIntentBits.MessageContent] }); //instancia da classe cliente, para comunicar diretamente com o bot
const ChannelApi = new ChannelsAPI();
const rest = new REST()



rest.setToken(token)

const comandos = require("./commands/comando1"); //o comando que foi exportado através do module.exports
const { channel } = require('node:process');

client.login(token); //o bot realiza o login usando o token

//cliente.on determina que um evento será usado.

/*primeiro parametro - o evento através da classe Events. Nesse caso, usamos o evento InteractionCreate, que quando uma interação com o bot for criada
(como usar um comando por exemplo), este evento será acionado.
*/

/* segundo parametro - função callback do que será executado quando a condição do evento for atendida. passamos um parametro para essa callback chamado
interaction. é nesse parametro que é armazenado, pelo evento, as informações da interação.
*/
client.on(Events.InteractionCreate , (interaction)=>{ 
    /*se acontecer uma interação, é mandado para o parametro interaction. Ele vai detectar que foi usado um comando e enviar uma resposta, contido no 
    método execute do arquivo comando1.js*/
    comandos.execute(interaction) // chama o método execute, passando a interação como parametro;
})

//cliente.once é tipo o client.on, a diferença é que o once é executado somente uma vez. o Evento ClientReady é se o bot está em execução/logado.
client.once(Events.ClientReady, async(readyClient)=>{
    console.log("Usuário Logado com sucesso")
    
    let mensagem = "asdasdad"
    let canal = client.channels.cache.get('767968580859199518')

     let arquivo = fs.readFile('./mensagem.txt' , 'utf-8' , (err,data)=>{
        canal.send({'content': data});
    })

    console.log(arquivo)
    
    //ChannelApi.createMessage(client.channels.resolveId("767968580859199518") , {"content":"Sexo"});
    
   
})




