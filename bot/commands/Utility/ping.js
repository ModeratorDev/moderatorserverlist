const Command = require("../../base/Command.js");

class PingCMD extends Command {
  constructor (client) {
    super(client, {
      name: "ping",
      description: "API response times and latency.",
      category: "Utility",
      usage: "",
      aliases: ["pong"],
      guildOnly: false
    });
  }

  async run (client, message, args, MessageEmbed) { // eslint-disable-line no-unused-vars

    const e1 = new MessageEmbed()
      .setTitle('Ping...')
      .setImage(`https://discordemoji.com/assets/emoji/loading.gif`)
      .setColor('GREEN')
    let msg = await message.channel.send(e1);

    const e2 = new MessageEmbed()
      .setTitle(':ping_pong: POng!!')
      .setColor('GREEN')
      .setDescription(`Bot Latency ${(msg.createdTimestamp - message.createdTimestamp)}ms.\nApi ${Math.round(client.ws.ping)}ms`)
      .setFooter(message.author.username, message.author.avatarURL())
    setTimeout(() => {
      msg.edit(e2);
    }, 10);
  }
}

module.exports = PingCMD;
