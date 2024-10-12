const express = require('express');
const Stripe = require('stripe');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Ensure you are using the correct secret key here
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51Q7YPz09Ta8MClJBdGmuN1Hhvm0X1SVdeECUe8Sd0EtBzKL3sRIyLZVC06Na4p8Xe4thX6qxjxkGhov4Mm5njOLU00vYjVbOQ3');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    const { totalPrice, email } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'ZAR',
                        product_data: {
                            name: 'Stubborn Attachments',
                        },
                        unit_amount: totalPrice * 100, // Amount in cents
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
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
