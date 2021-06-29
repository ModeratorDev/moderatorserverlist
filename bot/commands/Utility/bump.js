const Command = require('@bot/base/Command');
const Servers = require('@models/servers')

class BumpCMD extends Command {
    constructor (client) {
      super(client, {
        name: "bump",
        description: "Bumpea un servidor.",
        category: "Utility",
        usage: "",
        aliases: ["bumpserver", "serverbump"],
        permLevel: "User"
      });
    }

    async run (client, message, args, MessageEmbed) {
        const embed = new MessageEmbed()
          .setColor('PURPLE')
          .setFooter(message.author.username, message.author.avatarURL())
            .setTitle(`Cooky Servers » Bump`)
        
        let server = await Servers.findOne({guildid: message.guild.id}, { _id: false })
        if(!server) { 
            embed.setDescription('Se produjo un error, comuníquese con un administrador del sitio.')
            return message.channel.send(embed);
        }
        
        const timeremain = getTimeRemaining(server.lastbumped)
		      if(timeremain.days == 0) 
            if(timeremain.hours < 2) {
                embed.setDescription(`¡Demasiado temprano! Por favor regresa \n${1-timeremain.hours} horas, ${59-timeremain.minutes} minutos, ${60-timeremain.seconds} segundps.`)
                return message.channel.send(embed)
            }
        await Servers.updateOne({ guildid: server.guildid }, {$set: { lastbumped: new Date(Date.parse(new Date())) } })
        
        embed.setDescription('¡Golpeado con éxito!')
        message.channel.send(embed);
    }
}

function getTimeRemaining(endtime) {
  const total = Date.parse(new Date()) - Date.parse(endtime);
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

module.exports = BumpCMD;
