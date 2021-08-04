const mongoose=require('mongoose');

const unique_validator = require('mongoose-unique-validator');

const cart_schema = mongoose.Schema({
  /*'inputTableId' : {type:mongoose.Types.ObjectId, ref: 'mrtables', require:true,default:'123456'},*/
  'inputTableId' : {type:String,require:true},
  'inputItemId' : {type:mongoose.Types.ObjectId, ref: 'mitems', require:true},
  'inputQuantity' : {type:Number,require:true},
  'inputUserId' : {type:String,require:true},
  'inputPrice' : {type:Number,require:true},
  'created' : {type:Date,default:Date.now()}
});

cart_schema.plugin(unique_validator);

module.exports = mongoose.model('mcarts',cart_schema);
