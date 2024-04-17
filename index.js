const fs = require('node:fs');
const { Client, Events, GatewayIntentBits , REST} = require('discord.js');
const {ChannelsAPI} = require('@discordjs/core');
const { token , ApiKey } = require('./config.json');
const {google} = require("googleapis");
const colors = require("colors");


const youtube = google.youtube('v3');
const client = new Client({ intents: [GatewayIntentBits.Guilds , GatewayIntentBits.MessageContent] }); //instancia da classe cliente, para comunicar diretamente com o bot
const ChannelApi = new ChannelsAPI();
const rest = new REST()

function AvisarLive(IdCanal = '')
{
    let DataAtual = new Date();
    console.log(DataAtual.getHours())
    let RetornaLives = new Promise((resolve,  reject)=>
    {

        let repetir = true;

        setInterval(()=>
        {  
            const HoraAtual = new Date();

            if(HoraAtual.getHours() >= 12)
            {
              
                    const HoraAtual = new Date();
                    if(repetir === true) 
                    {
                        youtube.search.list({
                            'key':ApiKey,
                            'part':'snippet',
                            'eventType':'live',
                            'channelId': IdCanal,
                            'type':"video"
                        }).then(dados=>
                        {
                        if(Object.entries(dados.data.items).length == 0)
                            {
                                reject(colors.red(dados.data.items));
                                console.log("nenhuma live encontrada... procurando novamente")
                            }

                        else {
                                resolve(colors.green('Live encontrada!'))
                                console.log("live encontrada em")
                                let linkVideo = "https://www.youtube.com/watch?v=" + dados.data.items[0].id.videoId;
                                let canal = client.channels.cache.get('1226380144835559547')

                                let arquivo = fs.readFile('./mensagem.txt' , 'utf-8' , (err,data)=>
                                {
                                    canal.send({'content': data + linkVideo})
                                        console.log(data + linkVideo)
                                        repetir = false
                                        console.log("nice")
                                })
                            }
                        })
                    }

                    else {
                        console.log('ja fiz meu trabalho hoje :)')
                        console.log(HoraAtual.getHours())
                    }
            }

            if(HoraAtual.getHours() >= 0 && HoraAtual.getHours() < 12)
                    {
                        repetir = true;
                        console.log(colors.yellow("Reset com sucesso"))
                    }
        }, 480000) //480000 = 8 minutos
    })

   RetornaLives.then(sla=>console.log(sla)).catch(err=>console.log(err));
}

AvisarLive("UC-eDEfMuPi6hOXAJOIbVYPg");


rest.setToken(token)
client.login(token); 

//cliente.once é tipo o client.on, a diferença é que o once é executado somente uma vez. o Evento ClientReady é se o bot está em execução/logado.
client.once(Events.ClientReady, async(readyClient)=>{
    console.log(colors.green("Usuário Logado com sucesso"))
})




