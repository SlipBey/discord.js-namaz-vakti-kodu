const axios = require('axios')
const Discord = require('discord.js')

exports.run = (client, message, args) => {

  const city = args.join(' ').toLocaleUpperCase('EN');
  if (!city) return message.channel.send(new Discord.MessageEmbed().setColor(`#2F3136`).setDescription(`Lütfen şehir adı giriniz! !iftar istanbul`))

  axios.get(`https://api.collectapi.com/pray/all?data.city=${city}`, {
    headers: {
      "content-type": "application/json",
      "authorization": "apikey burayaapikey"
    }}).then(res => {
    return message.channel.send(new Discord.MessageEmbed().setColor(`#2F3136`).setTitle(`**${city}**`)
    .setDescription(`
    **Sabah Namazı:** ${res.data.result[0].saat}
    **Öğle Namazı:** ${res.data.result[2].saat}
    **İkindi Namazı:** ${res.data.result[3].saat}
    **Akşam Namazı:** ${res.data.result[4].saat}
    **Yatsı Namazı:** ${res.data.result[5].saat}
    `))
  }).catch(err => {
    message.channel.send(new Discord.MessageEmbed().setColor(`#2F3136`).setDescription(`Türkçe karakter kullanmayın! !iftar istanbul`))
    console.log(err);
  })


};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["namaz-vakti"],
    permLevel: 0
}
exports.help = {
    name: "namaz"
}
