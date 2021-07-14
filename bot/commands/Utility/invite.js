const Command = require('@bot/base/Command');
const Servers = require("@models/servers");

class InviteCMD extends Command {
    constructor (client) {
      super(client, {
        name: "invite",
        description: "Change Instant invitation to this channel. If [channel] is specified, create an instant invite for that channel (admin only)",
        category: "Utility",
        usage: "[channel]",
        aliases: ["invitechannel", "invitechan", "setinvite"],
        permLevel: "User"
      });
    }

    async run (client, message, args, MessageEmbed) {
        let perms = message.member.hasPermission("BAN_MEMBERS") //Verificamos permisos del user
        if (!perms) return message.channel.send("X | Usted no tiene permisos")
      let selectedchannel = message.mentions.channels.first() || message.channel;

        let invite = await selectedchannel.createInvite({ maxAge: 0, maxUses: 0 }).catch(() => {});
        if(!invite) return message.channel.send(`I could not create an invite to ${selectedchannel}`);

        await Servers.updateOne({ guildid: message.guild.id }, {$set: { invite } })

		    const embed = new MessageEmbed()
        	.setColor('PURPLE')
        	.setFooter(message.author.username, message.author.avatarURL())
          .setTitle(`Moderator Servers » Link de Invite`)
          .setDescription(`Instant invite has been set!`)
          .addField('Channel', `${selectedchannel}`)
          .addField('Instant invite', `${invite}`)
        message.channel.send(embed);
    }
}

module.exports = InviteCMD;
