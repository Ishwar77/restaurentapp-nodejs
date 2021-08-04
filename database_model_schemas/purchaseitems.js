const mongoose=require('mongoose');

const unique_validator = require('mongoose-unique-validator');

const purchaseitems_schema = mongoose.Schema({
  'inputOrderId' : {type:mongoose.Types.ObjectId, ref: 'morders', require:true},
  'inputItemId' : {type:mongoose.Types.ObjectId, ref: 'mitems', require:true},
  'inputQuantity' : {type:String,require:true},
  'inputPrice' : {type:String,require:true}
});

purchaseitems_schema.plugin(unique_validator);

module.exports = mongoose.model('mpurchaseitems',purchaseitems_schema);
