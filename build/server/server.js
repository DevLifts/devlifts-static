// Import dotenv to utilize environment variables
require('dotenv').config()

// Import dependencies
const express = require('express');
const path = require('path');

// Create app instance
const app = express();

// Import Stripe
const keyPublishable = process.env.STRIPE_PUBLIC_TEST;
const keySecret = process.env.STRIPE_SECRET_TEST;

const coupons = process.env.COUPONS.split(' ');

const stripe = require("stripe")(keySecret);

// Define the port to run on and use body-parser
app.set('port', 9000);
app.use(require("body-parser").urlencoded({extended: false}));

// Use Static Files
app.use(express.static(path.join(__dirname, '/../public')));

// Listen for requests
const server = app.listen(app.get('port'), function() {
  const port = server.address().port;
  console.log('Magic happens on port ' + port);
});

app.post("/charge", (req, res) => {
  let amount = 14900;
  console.log(req.body);
  console.log(coupons);

  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken,
    metadata: {
      'first_name': req.body.firstName,
      'last_name': req.body.lastName
    }
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Personalized Fitness Plan",
         currency: "USD",
         customer: customer.id
    }))
  .then(charge => res.send("success"))
});