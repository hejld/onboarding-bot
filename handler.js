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
  if (!event.body) {
    return { statusCode: 400 };
  }

  const body = JSON.parse(event.body);

  if (body.challenge)
    return {
      statusCode: 200,
      body: body.challenge,
    };

  const eventType = body.type;

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
