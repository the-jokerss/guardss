const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
exports.run = async(client, message, args, prefix, ayar, emoji) => {

    const voiceChannels = message.guild.channels.cache.filter(c => c.type === "voice");
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels)
      count += voiceChannel.members.size;

  let enAltYetkiliRolü = message.guild.roles.cache.get(ayarlar.enaltyetki); // EN ALT YETKİLİ ROLÜNÜN IDSİ
  let kaan = 0
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()
  let yetkililer = message.guild.members.cache.filter(uye => uye.roles.highest.position >= enAltYetkiliRolü.position && !uye.voice.channel && !uye.user.bot && uye.presence.status !== "offline");
let embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle("• Yetkili Sistemi")
message.channel.send(`**${message.guild.name}** \n__Adlı sunucuda ki sesli odalarda__ **__${count}__** __kişi bulunmaktadır.__ \n \n__Toplam Seste Olmayan Yetkili Sayısı:__ **__${yetkililer.size}__** \n \n__Toplam Seste Olmayan Yetkililer:__ \n${yetkililer.map(y => y).join(`\n`)}`)

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = { 
  name: 'ytsay', 
  description: 'Seste olmayan yetkilileri gösterir.',
  usage: 'yetkilisay',
  kategori: 'kullanıcı'
};