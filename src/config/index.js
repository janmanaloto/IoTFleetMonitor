require('dotenv').config();

module.exports = {
    connectionString: process.env.IOT_HUB_CONNECTION_STRING,
    teamsWebhookUrl: process.env.TEAMS_WEBHOOK_URL,
    deviceIds: process.env.DEVICE_IDS.split(','),
    intervalMinutes: parseInt(process.env.INTERVAL_MINUTES || 10, 10),
    teamsChannelId: process.env.TEAMS_CHANNEL_ID,
};
