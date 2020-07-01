const queryString = require('query-string');

exports.handler = async (event, context, callback) => {
  console.log('### BODY', queryString.parse(event.body))
  callback(null, {
    statusCode: 200
  });
}