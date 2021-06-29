'use strict';
const Command = require("@bot/base/Command.js");
const { inspect } = require('util');

class Eval extends Command {
  constructor (client) {
    super(client, {
      name: "eval",
      description: "Evalua un codigo de javaScript.",
      category: "System",
      usage: "<expression>",
      aliases: ["evaluate"],
      permLevel: "Site Admin",
      guildOnly: true,
    });
  }

  async run (client, message, args, MessageEmbed) {
    const { member, author, channel, guild } = message;
    const embed = new MessageEmbed()
      .setFooter(message.author.username, message.author.avatarURL())
    const query = args.join(' ')
    if (query) {
      const code = (lang, code) => (`\`\`\`${lang}\n${String(code).slice(0, 1000) + (code.length >= 1000 ? '...' : '')}\n\`\`\``).replace(client.token,"En realidad...? No te voy a dar mi token ...")
      try {
        const evald = eval(query)
        const res = (typeof evald === 'string' ? evald : inspect(evald, { depth: 0 }))
        embed.addField('Result', code('js', res))
          .addField('Tipo', code('css', typeof evald === 'undefined' ? 'Unknown' : typeof evald))
          .setColor('#8fff8d')
      } catch (err) {
        embed.addField('Error', code('js', err))
          .setColor('#ff5d5d')
      } finally {
        message.channel.send(embed).catch(err => {
            message.channel.send(`There was an error while displaying the eval result! ${err.message}`)
          })
      }
    } else {
      message.channel.send('Intentando no evaluar nada .....')
      message.channel.send('No tengo nada...')
      message.channel.send('Tal vez ... Ya sabes ... ¿Intenta decirme algo para evaluar la próxima vez?')
    }
  }
}

module.exports = Eval;
