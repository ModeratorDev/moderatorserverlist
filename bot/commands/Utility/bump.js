const Command = require('@bot/base/Command');
const Servers = require('@models/servers')

class BumpCMD extends Command {
    constructor (client) {
      super(client, {
        name: "bump",
        description: "Bump a server.",
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
            .setTitle(`Moderator Servers » Bump`)
        let server = await Servers.findOne({guildid: message.guild.id}, { _id: false })
        if(!server) { 
            embed.setDescription('An error occurred, contact a site administrator.')
            return message.channel.send(embed);
        }
        
        const timeremain = getTimeRemaining(server.lastbumped)
		      if(timeremain.days == 0) 
            if(timeremain.hours < 2) {
                embed.setDescription(`${message.author}, Too early! Please come back in \n${1-timeremain.hours} hours, ${59-timeremain.minutes} minutes, ${60-timeremain.seconds} seconds.`)
                  .setThumbnail("https://media.discordapp.net/attachments/863210856304345118/865247921661804544/unknown.png?width=401&height=401")  
              return message.channel.send(embed)
            }
        await Servers.updateOne({ guildid: server.guildid }, {$set: { lastbumped: new Date(Date.parse(new Date())) } })
        
        embed.setDescription(`${message.author},
         Bump done :thumbsup:
         Check it in the [Server List](https://moderatorservers.glitch.me/)`)
                 .setImage("https://media.discordapp.net/attachments/839881374201937930/865213828068671488/Sin_titulo.jpg?width=712&height=401")

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
