const express = require('express');
const ordercontroller = require('../controllers/orders');
const checkauth = require('../middlewares/check-auth');
const orderroute = express.Router();

orderroute.get("",ordercontroller.getOrderList);
orderroute.get("/:oid",ordercontroller.getSingleOrderDetails);

module.exports = orderroute;
