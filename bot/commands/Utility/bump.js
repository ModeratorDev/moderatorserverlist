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
            embed.setDescription('Se produjo un error, comuníquese con un administrador del sitio.')
            return message.channel.send(embed);
        }
        
        const timeremain = getTimeRemaining(server.lastbumped)
		      if(timeremain.days == 0) 
            if(timeremain.hours < 2) {
                embed.setDescription(`Too early! Please come back \n${1-timeremain.hours} hours, ${59-timeremain.minutes} minutes, ${60-timeremain.seconds} seconds.`)
                return message.channel.send(embed)
            }
        await Servers.updateOne({ guildid: server.guildid }, {$set: { lastbumped: new Date(Date.parse(new Date())) } })
        
        embed.setDescription('Bump successfully!')
                 .setImage("https://media.discordapp.net/attachments/839881374201937930/865213828068671488/Sin_titulo.jpg?width=712&height=401")

        message.channel.send(embed);
    }
}

// 

fuyou can put this function in some kind of utils.js filection getTimeRemaining(endtime) {
  const total = Date.parse(new Date()) - Date.parse(endtime);
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

module.exports = BumpCMD;
