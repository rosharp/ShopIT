const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const catchAsyncError = require('../middlewares/catchAsyncErrors');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process stripe payments => /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, mext) => {
  const paymentIntent = await stripe.paymentIntent.create({
    amount: req.body.amount,
    currency: 'usd',
    metadata: { integration_check: 'accepts_a_payment' }
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret
  })
})
