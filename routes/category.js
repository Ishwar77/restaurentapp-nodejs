const express = require('express');
const categorycontroller = require('../controllers/category');
const categoryroute = express.Router();
const fileextracts = require('../middlewares/fileextractcat');

categoryroute.post("",fileextracts,categorycontroller.addNewCategory);
categoryroute.get("",categorycontroller.getcategorylist);
categoryroute.get("/:id",categorycontroller.getsinglecategory);
module.exports = categoryroute;
