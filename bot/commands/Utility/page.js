const Command = require('@bot/base/Command');

class PageCMD extends Command {
    constructor (client) {
      super(client, {
        name: "page",
        description: "Obtener el enlace de la página del servidor",
        category: "Utility",
        usage: "[command]",
        aliases: ["guild", "link", "guildlink"],
        permLevel: "User"
      });
    }

    async run (client, message, args, MessageEmbed) {
		const embed = new MessageEmbed()
        	.setColor('PURPLE')
        	.setFooter(message.author.username, message.author.avatarURL())
            .setTitle(`Cooky Servers » Servidor Link`)
            .setDescription(`${process.env.DOMAIN}/server/${message.guild.id}`)
        message.channel.send(embed);
    }
}

module.exports = PageCMD;
