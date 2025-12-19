const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const FAUCET_CHANNEL = '1451387067106984059';
const WEBHOOK_URL = 'https://qtitrjkaatzdwrbeysvd.supabase.co/functions/v1/discord-faucet/webhook';

client.on('ready', () => console.log(`Bot ready as ${client.user.tag}`));

client.on('messageCreate', async (msg) => {
  if (msg.channel.id !== FAUCET_CHANNEL || msg.author.bot) return;
  
  console.log(`Processing: ${msg.content}`);
  
  await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      t: 'MESSAGE_CREATE',
      d: {
        channel_id: msg.channel.id,
        content: msg.content,
        id: msg.id,
        author: { id: msg.author.id, username: msg.author.username, bot: msg.author.bot }
      }
    })
  });
});

client.login(process.env.DISCORD_BOT_TOKEN);
