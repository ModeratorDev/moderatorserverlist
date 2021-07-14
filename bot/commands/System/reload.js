const Command = require("@bot/base/Command.js");

class Reload extends Command {
  constructor (client) {
    super(client, {
      name: "reload",
      description: "Vuelve a cargar un comando que se ha modificado.",
      category: "System",
      usage: "[command]",
      aliases: ['r', 'rl'],
      permLevel: "Site Admin",
      guildOnly: true,
    });
  }

  async run (client, message, args, MessageEmbed) { // eslint-disable-line no-unused-vars
    let em = new MessageEmbed();
    if (!args || args.length < 1) return em.setDescription(`Debe proporcionar un comando o un evento para recargar.`).setColor('RED') && message.reply(em);

    const commands = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
    const events = client.events.get(args[0]);
    if(commands) {
      let response = await client.unloadCommand(commands.conf.location, commands.help.name);
      if (response) return em.setDescription(`Error al descargar el comando: ${response}`).setColor('RED') && message.channel.send(em);

      response = client.loadCommand(commands.conf.location, commands.help.name);
      if (response) return em.setDescription(`Error al cargar el comando: ${response}`).setColor('RED') && message.channel.send(em);

      em.setDescription(`Se ha vuelto a cargar el comando \`${commands.help.name}\``).setColor('GREEN')
      message.channel.send(em);
    }else if(events){
      //let response = await client.unloadEvent(events.conf.location, events.conf.name);
      //if (response) return em.setDescription(`Error unloading event: ${response}`).setColor('RED') && message.channel.send(em);

      //let response = await client.reloadEvent(events.conf.location, events.conf.name);
      //if (response) return em.setDescription(`Error reloading event: ${response}`).setColor('RED') && message.channel.send(em);

      //em.setDescription(`The event \`${events.conf.name}\` has been reloaded`).setColor('GREEN')
      em.setDescription(`Los eventos aún no se pueden volver a cargar.`).setColor('RED')
      message.channel.send(em);
    }else{
      em.setDescription(`\`${args[0]}\` no existe, ni es un alias.`).setColor('RED');
      return message.channel.send(em);
    }
  }
}
module.exports = Reload;
