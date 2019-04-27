const qs = require('querystring');
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
  }

  const body = JSON.parse(event.body);

  // respond to Slack challenge when testing events handler webhook
  if (body.challenge)
    return {
      statusCode: 200,
      body: body.challenge,
    };

  // user joined channel, welcome him
  if (
    body.event &&
    body.event.type == 'member_joined_channel' &&
    body.event.channel_type == 'C'
  ) {
    // console.log(body.event)
    console.log(
      'sending welcome message to user ',
      body.event.user,
      ' in channel ',
      body.event.channel,
    );
    onboard.initialMessage('THYJQE3R6', body.event.user, body.event.channel);
    return {
      statusCode: 200,
      body: 'Welcome to a public channel!',
    };
  }
  res.sendStatus(500);
};

module.exports.interactive = async event => {
  if (!event.body) {
    return { statusCode: 400 };
  }
  const { user, team } = JSON.parse(qs.parse(event.body).payload);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        text:
          'Thank you <@' + user.id + '>! The Terms of Service have been accepted.',
      },
      null,
      2,
    ),
  };
};

module.exports.test = async event => {
  onboard.initialMessage('THYJQE3R6', 'UHWQXJ3RR');
  return { statusCode: 200 };
};
