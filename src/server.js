const express = require('express');
<<<<<<< HEAD
const Stripe = require('stripe');
const cors = require('cors');
require('dotenv').config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);  // Your Stripe Secret Key
=======
const stripe = require('stripe')('your_secret_key'); // Replace with your secret key
const app = express();
const cors = require('cors');
>>>>>>> 987441c4a098420f92ca55fe0e69adb203236149

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
app.post('/create-payment-intent', async (req, res) => {
  const { amount, customerEmail } = req.body;  // amount in cents, customer email
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card'],
      receipt_email: customerEmail,  // Optional: Send a receipt to the customer
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======
app.post('/create-checkout-session', async (req, res) => {
    const { amount, currency, email } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: currency,
                        product_data: {
                            name: 'Stubborn Attachments',
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000?success=true',
            cancel_url: 'http://localhost:3000?canceled=true',
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server is running on port 3000'));
>>>>>>> 987441c4a098420f92ca55fe0e69adb203236149
