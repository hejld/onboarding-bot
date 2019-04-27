const qs = require('querystring');
const axios = require('axios');
const apiUrl = 'https://slack.com/api';

const postResult = result => console.log(result.data);

// default message - edit to include actual ToS
const message = {
  token: process.env.SLACK_ACCESS_TOKEN,
  link_names: true,
  text: " 👋, welcome aboard! We’re excited to have you with us. I’m here to make your onboarding process easier.",
  as_user: false,
  attachments: JSON.stringify([
    {
      text: 'Before we start let ask how something. Have you used Slack :slack: before?',
      callback_id: 'new-to-slack',
      color: '#3060f0',
      actions: [
        {
          name: 'status',
          text: 'Yes, I am a :slack: Lover.',
          type: 'button',
          value: 'experienced',
          style: 'primary',
        },{
          name: 'status',
          text: 'No, show me how to use Slack :slack:',
          type: 'button',
          value: 'new',
          style: 'danger',
        }
      ],
    },
  ]),
};

const initialMessage = (teamId, userId, channelId) => {
  message.channel = channelId;
  message.text = `Hello <@${userId}>`+message.text;
  message.user = userId;
  axios
    .post(`${apiUrl}/chat.postEphemeral`, qs.stringify(message))
    .then(result => {});
};

module.exports = { initialMessage };
