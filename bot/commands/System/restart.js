const Command = require('@bot/base/Command');
const colors = require('colors');

class RestartCMD extends Command {
    constructor (client) {
      super(client, {
        name: "restart",
        description: "Reinicia el bot.",
        category: "System",
        usage: "",
        aliases: ['reboot'],
        permLevel: "Site Admin"
      });
    }

    async run (client, message, args, MessageEmbed) {
      await client.database.reboot.ensure();
      const em = new MessageEmbed().setColor('#ff0000').setTitle("Reinicio del sistema").setFooter("¡Todos los servicios de Void Bots dejarán de funcionar temporalmente!").setDescription("Cya later! I'll be back after I get milk!");
      await console.log(colors.red(`\n-- Reinicio del sistema -- `) + colors.yellow(message.author.tag) + colors.red(` --\n`))
      await message.channel.send(em).then(async (m) => {
          await client.database.reboot.update({ rebooted: true, channelid: m.channel.id, messageid: m.id, ranuser: message.author.tag });
      });
      process.exit(0);
    }
}

module.exports = RestartCMD;
