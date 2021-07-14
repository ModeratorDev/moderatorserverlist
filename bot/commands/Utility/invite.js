const Command = require('@bot/base/Command');
const Servers = require("@models/servers");

class InviteCMD extends Command {
    constructor (client) {
      super(client, {
        name: "invite",
        description: "Cambiar Invitación instantánea a este canal. Si se especifica [canal], cree una invitación instantánea para ese canal (solo administrador)",
        category: "Utility",
        usage: "[channel]",
        aliases: ["invitechannel", "invitechan", "setinvite"],
        permLevel: "User"
      });
    }

    async run (client, message, args, MessageEmbed) {
        if(!message.guild.me.permissions.has(1)) return message.channel.send('Necesito el permiso `CREATE_INVITE` para este comando.');
        let selectedchannel = message.mentions.channels.first() || message.channel;

        let invite = await selectedchannel.createInvite({ maxAge: 0, maxUses: 0 }).catch(() => {});
        if(!invite) return message.channel.send(`I could not create an invite to ${selectedchannel}`);

        await Servers.updateOne({ guildid: message.guild.id }, {$set: { invite } })

		    const embed = new MessageEmbed()
        	.setColor('PURPLE')
        	.setFooter(message.author.username, message.author.avatarURL())
          .setTitle(`Moderator Servers » Link de Invite`)
          .setDescription(`¡Se ha establecido la invitación instantánea!`)
          .addField('Canal', `${selectedchannel}`)
          .addField('Invitación instantánea', `${invite}`)
        message.channel.send(embed);
    }
}

module.exports = InviteCMD;
