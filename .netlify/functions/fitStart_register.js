const fetch = require('node-fetch');
const queryString = require('query-string');

const ZAPIER_ENDPOINT = "https://hooks.zapier.com/hooks/catch/1776164/o80fkvy";

exports.handler = async (event, context, callback) => {
  const parsedBody = queryString.parse(event.body);
  
  if (!parsedBody) {
    callback(new Error("Missing required fields."), { statusCode: 400 })
    return;
  }

  if (!parsedBody.Email) {
    callback(new Error("Missing email address."), { statusCode: 400 })
    return;
  }

  if ( parsedBody.Product !== "fit.Start(lean)" || parsedBody.Product !== "fit.Start(bodyweight)" || parsedBody.Product !== "fit.Start(strong)") {
    callback(new Error("Bad bot."), { statusCode: 400 })
    return;
  }

  fetch(ZAPIER_ENDPOINT, {
    method: "POST",
    body: parsedBody,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(() => {
    callback(null, {
      statusCode: 200
    });
  }).catch(err => {
    callback(new Error("Error sending data to Zapier. Please try again."), {
      statusCode: err.statusCode || 500,
    });
  });
}