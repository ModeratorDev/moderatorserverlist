const Command = require('@bot/base/Command');

class HelpCMD extends Command {
    constructor (client) {
      super(client, {
        name: "help",
        description: "Show the commands in the bot.",
        category: "Utility",
        usage: "[command]",
        aliases: [],
        permLevel: "User"
      });
    }

    async run (client, message, args, MessageEmbed) {
        const level = client.permLevel(message);
        const embed = new MessageEmbed()
        .setColor('LUMINOUS_VIVID_PINK')
        .setFooter(`${message.author.username} • Usa ${process.env.PREFIX}help <comando> para ver detalladamente el comando..`, message.author.avatarURL());
      // If args[0] then show the command's information.
    if (!args[0]) {
      // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
      const myCommands = client.commands.filter(cmd => cmd.help.category != "System");
/*
      // Here we have to get the command names only, and we use that array to get the longest name.
      // This make the help commands "aligned" in the output.
      const commandNames = myCommands.keyArray();
      const commands = {};

      commandNames.forEach((cmd) => {
        const command = myCommands.get(cmd).help;
        if(!commands[command.category.toLowerCase()]) commands[command.category.toLowerCase()] = [];
        commands[command.category.toLowerCase()].push(command);
      });

      let categories = Object.keys(commands);
      categories.forEach((cat) => {
        let output = [];
        commands[cat].forEach((cmd) => {
          output.push(`\`${process.env.PREFIX}${cmd.name} ${cmd.usage}\` - ${cmd.description}`);
        })
        embed.addField(`${cat.toProperCase()}`, output)
      });*/


      let output = [];
      myCommands.forEach((cmd) => {
        output.push(`\`${process.env.PREFIX}${cmd.help.name}${cmd.help.usage ? ' ' : ''}${cmd.help.usage}\` - ${cmd.help.description}`)
      });



      embed
      	.setTitle(`Moderator Servers » Help`)
        .setDescription(`Soy un bot: Moderator Servers (https://moderatorservers.gq/) :robot:`)
        .addField('Commands', output.join('\n'))
      message.channel.send(embed);
    } else {
      if(args[0] == "dev" || args[0] == "developer" || args[0] == "system") {
        const myCommands = client.commands.filter(cmd => cmd.help.category == "System");
        let output = [];
        myCommands.forEach((cmd) => {
          output.push(`\`${process.env.PREFIX}${cmd.help.name}${cmd.help.usage ? ' ' : ''}${cmd.help.usage}\` - ${cmd.help.description}`)
        });
        embed
        	.setTitle(`Moderator Servers » Help (Developers)`)
          .setDescription(`I'm a bot: Moderator Servers (https://moderatorservers.gq/) :robot:`)
          .addField('Commands', output.join('\n'))
        message.channel.send(embed);
      }
      // Show individual command's help.
      let command = args[0];
      if (client.commands.has(command) || client.commands.has(client.aliases.get(command))) {
        command = client.commands.get(command);
        embed
            .setTitle(`Help » ${command.help.name.toProperCase()}`)
            .addField(`Description`, command.help.description || "None")
            .addField(`Usage`, `${process.env.PREFIX}${command.help.name} ${command.help.usage}` || "None")
            .addField(`Aliases`, command.conf.aliases.join(', ') || "None")
            .addField(`Permission Level`, command.conf.permLevel || "Error", true)
            .addField(`Category`, command.help.category || "Error", true);
        message.channel.send(embed);
      }
    }
  }
}

module.exports = HelpCMD;
