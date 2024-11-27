const axios = require('axios');
const { teamsWebhookUrl, teamsChannelId } = require('../config');

async function sendNotificationToTeams(message, themeColor, mentionTeam) {
    const cardPayload = {
        type: 'message',
        attachments: [
            {
                contentType: 'application/vnd.microsoft.card.adaptive',
                content: {
                    '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
                    type: 'AdaptiveCard',
                    version: '1.3',
                    body: [
                        { type: 'TextBlock', text: '**IoT Device Status Report**', weight: 'bolder', size: 'medium' },
                        { type: 'TextBlock', text: message.replace(/\n/g, '\n\n'), wrap: true },
                    ],
                    msteams: {},
                },
            },
        ],
    };

    if (mentionTeam) {
        cardPayload.attachments[0].content.body.push({ type: 'TextBlock', text: '<at>Team</at>', wrap: true, color: 'warning' });
        cardPayload.attachments[0].content.msteams.entities = [
            { type: 'mention', text: '<at>Team</at>', mentioned: { id: teamsChannelId, name: 'Team' } },
        ];
    }

    return axios.post(teamsWebhookUrl, cardPayload);
}

module.exports = {
    sendNotificationToTeams,
};
