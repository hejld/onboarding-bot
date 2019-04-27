const onboard = require('./src/onboard');

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        input: event,
      },
      null,
      2,
    ),
  };
};

module.exports.events = async event => {
  // no POST input?
  if (!event.body) {
    return { statusCode: 400 };
  };

  const body = JSON.parse(event.body);

  // respond to Slack challenge when testing events handler webhook
  if (body.challenge) return {
    statusCode: 200,
    body: body.challenge
  };

  if (body.event && body.event.type == 'member_joined_channel' && body.event.channel_type == 'C') return {
    statusCode: 200,
    body: 'Welcome to a public channel!',
  };

  return {
    statusCode: 200,
    body: JSON.stringify({
      input: event,
    }),
  };
};

module.exports.interactive = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      text: 'Thank you! The Terms of Service have been accepted.',
    }),
  };
};

module.exports.test = async event => {
  onboard.initialMessage('THYJQE3R6', 'UHWQXJ3RR');
  return { statusCode: 200 };
};
