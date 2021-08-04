const express = require('express');
const itemcontroller = require('../controllers/item');
const itemroute = express.Router();
const fileextracts = require('../middlewares/fileextract');

itemroute.post("",fileextracts,itemcontroller.addNewItem);
itemroute.get("",itemcontroller.getitemlist);
itemroute.get("/:catid",itemcontroller.getcategoryitemlist);
module.exports = itemroute;
