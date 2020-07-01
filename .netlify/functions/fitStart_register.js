const fetch = require('node-fetch');

const ZAPIER_ENDPOINT = "https://hooks.zapier.com/hooks/catch/1776164/o80fkvy";

exports.handler = (event, context, callback) => {
  const { body } = event;
  
  if (!body) {
    callback(new Error("Missing required fields."), { statusCode: 400 })
    return;
  }

  if (!body.Email) {
    callback(new Error("Missing email address."), { statusCode: 400 })
    return;
  }

  if ( body.Product !== "fit.Start(lean)" || body.Product !== "fit.Start(bodyweight)" || body.Product !== "fit.Start(strong)") {
    callback(new Error("Bad bot."), { statusCode: 400 })
    return;
  }



 fetch(ZAPIER_ENDPOINT, {
      method: "POST",
      body,
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