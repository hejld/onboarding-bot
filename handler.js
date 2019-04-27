'use strict';

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      input: event,
    }, null, 2),
  };
};

module.exports.events = async event => {
  if (!event.body) {
    return { statusCode: 400 };
  }

  const body = JSON.parse(event.body)

  if (body.challenge) return {
    statusCode: 200,
    body: body.challenge
  }

  const eventType = body.type;

  return {
    statusCode: 200,
    body: JSON.stringify({
      input: event,
    }),
  };
};
