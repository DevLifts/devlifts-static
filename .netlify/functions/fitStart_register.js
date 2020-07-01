const fetch = require('node-fetch');
const queryString = require('query-string');

const ZAPIER_ENDPOINT = "https://hooks.zapier.com/hooks/catch/1776164/o80fkvy";

exports.handler = async (event, context, callback) => {
  const parsedBody = queryString.parse(event.body);
  console.log(parsedBody);
  
  if (!parsedBody) {
    return { 
      statusCode: 400,
      body: "Missing required fields." 
    }
  }

  if (!parsedBody.Email) {
    return { 
      statusCode: 400,
      body: "Missing email address."
    }
  }

  if ( parsedBody.Product !== "fit.Start(lean)" && parsedBody.Product !== "fit.Start(bodyweight)" && parsedBody.Product !== "fit.Start(strong)") {
    return { 
      statusCode: 400,
      body: "Bad bot."
    }
  }

  try {
    console.log('attempting to reach zapier...');
    let response = await fetch(ZAPIER_ENDPOINT, {
      method: "POST",
      body: parsedBody,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log("SUCCESS", response)
  } catch (err) {
    return { 
      statusCode: err.statusCode || 500,
      body: "Error sending data to Zapier. Please try again."
    }
  }

  return {
    statusCode: 200
  }
}