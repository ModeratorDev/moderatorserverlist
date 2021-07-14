const Command = require("@bot/base/Command.js");

class ExecuteCMD extends Command {
    constructor (client) {
      super(client, {
        name: "execute",
        description: "Ejecute un comando de consola. (Comandos de la línea de comandos).",
        category: "System",
        usage: "<console command>",
        aliases: ['exec'],
        permLevel: "Site Admin",
        guildOnly: true,
      });
    }

    async run (client, message, args, MessageEmbed) {
      if(!args.join(' ')) return message.reply('Ingrese un comando de consola.');
      let result = require('child_process').execSync(args.join(' ')).toString();
      const e = new MessageEmbed().addField('Resultado', `\`\`\`js\n${result.slice(0, 2000)}\`\`\``).setFooter(message.author.username, message.author.avatarURL()).setColor('GREEN');
      message.channel.send(e);
    }
}

module.exports = ExecuteCMD;