const qs = require('querystring');
const axios = require('axios');
const apiUrl = 'https://slack.com/api';

const postResult = result => console.log(result.data);

// default message - edit to include actual ToS
const message = {
  token: process.env.SLACK_ACCESS_TOKEN,
  link_names: true,
  text: "Welcome to the team! We're glad you're here.",
  as_user: false,
  attachments: JSON.stringify([
    {
      title: 'What is Slack?',
      text:
        "Slack is where work happens. If this is your first time using Slack, take some time to read the help docs at get.slack.help and our internal wiki. If you have any questions, jump into #help-slack and we'll help you out",
      color: '#74c8ed',
    },
    {
      title: 'Code of Conduct',
      text:
        'Our goal is to maintain a safe, helpful and friendly community for everyone, regardless of experience, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, nationality, or other defining characteristic. Please take the time to read through <https://code.localhost|Code of Conduct> before continuing.',
      callback_id: 'terms-of-service',
      color: '#3060f0',
      actions: [
        {
          name: 'accept',
          text: 'Accept',
          type: 'button',
          value: 'accept',
          style: 'primary',
        },
      ],
    },
  ]),
};

const initialMessage = (teamId, userId, channelId) => {
  message.channel = channelId;
  message.user = userId;
  axios
    .post(`${apiUrl}/chat.postEphemeral`, qs.stringify(message))
    .then(result => {});
};

module.exports = { initialMessage };
