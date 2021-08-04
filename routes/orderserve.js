const express = require('express');
const ordercontroller = require('../controllers/orders');
const orderroute = express.Router();


orderroute.get("/:oid",ordercontroller.serveorder);

module.exports = orderroute;
