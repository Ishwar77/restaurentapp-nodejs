const mongoose=require('mongoose');

const unique_validator = require('mongoose-unique-validator');

const orders_schema = mongoose.Schema({
  /*'inputTableId' : {type:mongoose.Types.ObjectId, ref: 'mrtables', require:true},*/
  'inputTableId' :{type:String, require:true},
  'inputStatus' : {type:String, require:true},
  'inputUserId' : {type:String, require:true},
  'inputTotalCost' : {type:String,require:true},
  'created' : {type:Date,default:Date.now()}
});

orders_schema.plugin(unique_validator);

module.exports = mongoose.model('morders',orders_schema);
