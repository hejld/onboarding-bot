'use strict';

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body:
      '<h2>The Welcome/Terms of Service app is running</h2> <p>Follow the' +
      ' instructions in the README to configure the Slack App and your' +
      ' environment variables.</p>',
  };
};

module.exports.events = async event => {
  if (!body || !body.type) {
    return { statusCode: 400 };
  }

  const eventType = body.type;

  return {
    statusCode: 200,
    body: JSON.stringify({
      input: event,
    }),
  };
};
