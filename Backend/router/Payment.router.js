const Paymentrouter = require('express').Router();
const { createPaymentOrder , verifyPayment, getReceipt } = require('../controller/Payment.controller');

Paymentrouter.post('/create-order', createPaymentOrder);
Paymentrouter.post('/verify', verifyPayment);
Paymentrouter.post('/getReceipt',getReceipt);

module.exports = Paymentrouter;