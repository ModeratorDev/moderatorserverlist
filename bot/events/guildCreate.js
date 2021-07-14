const Event = require('@bot/base/Event.js');
const Servers = require('@models/servers');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Event {
  constructor (client) {
    super(client, {
      name: 'guildCreate',
      enabled: true,
    });
  }

  async run (client, guild) {

    await Servers({ guildid: guild.id, description: `${guild.name}'s Description'`, long: `# ${guild.name}` }).save();

try {
    const e = new MessageEmbed()
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL())
      .setColor('GREEN')
      .addField('Owner', `${guild.owner.user.tag} \`(${guild.owner.user.id})\``, true)
      .addField('Miembros', guild.members.cache.size, true)
      .addField('\u200b', '\u200b', true)
      .addField('Guild ID', guild.id, true)
      .addField('Creado el', moment(guild.createdAt).format("LLL"), true)
    client.channels.cache.get(process.env.GUILD_LOG).send(e);
    client.logger.log(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
  }catch (err) {
console.trace(err)
  }
}
};
