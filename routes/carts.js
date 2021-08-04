const express = require('express');
const cartcontroller = require('../controllers/carts');
const checkauth = require('../middlewares/check-auth');
const cartroute = express.Router();


cartroute.post("",checkauth,cartcontroller.addNewCart);
cartroute.post("/checkout",checkauth,cartcontroller.performCartCheckout);
cartroute.get("",checkauth,cartcontroller.getCartItems);
cartroute.delete("/:itemid",checkauth,cartcontroller.deleteCartItem);
cartroute.delete("",checkauth,cartcontroller.deleteCart);
module.exports = cartroute;
