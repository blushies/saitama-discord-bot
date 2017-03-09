require('dotenv').config();
import * as Discord from 'discord.js';

const client = new Discord.Client({
  sync: true,
});


const responses = new Map([
  // message / response
  ['nice', 'meme'],
])

client.on('message', async message => {
  try {
    if (message.channel.id === process.env.CHANNEL_ID) {

      // check if the message we received contains text that we're looking to respond to
      let response = null;
      for (let responseKey of responses.keys()) {
        if (message.content.indexOf(responseKey) !== -1) {
          response = responses.get(responseKey);
          break;
        }
      }

      // send response if we have one
      if (response) {
        await message.channel.send(response);
      }
    }
  }
  catch (e) {
    console.error(e);
  }
});

client.on('ready', () => {
  console.log('I am ready!');
});

client.login(process.env.API_TOKEN);
