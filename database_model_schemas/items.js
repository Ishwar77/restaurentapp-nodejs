const mongoose=require('mongoose');

const unique_validator = require('mongoose-unique-validator');

const items_schema = mongoose.Schema({
  'inputCatagory' :{type:mongoose.Types.ObjectId,ref : 'mcatagories',require:true},
  'inputItemName' : {type:String,require:true},
  'inputDescription' : {type:String,require:true},
  'inputIngridients' : {type:String,require:true},
  'inputHealthBenifits' : {type:String,require:true},
  'inputIsVeg' : {type:String,require:true},
  'inputItemImage' : {type:String,require:true},
  'inputUnitPrice' : {type:Number,require:true}
});

items_schema.plugin(unique_validator);

module.exports = mongoose.model('mitems',items_schema);
