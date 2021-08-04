const mongoose=require('mongoose');

const unique_validator = require('mongoose-unique-validator');

const categories_schema = mongoose.Schema({
  'inputCategory' : {type:String,require:true,unique:true},
  'inputCategoryImage' : {type:String,require:true}
});

categories_schema.plugin(unique_validator);

module.exports = mongoose.model('mcatagories',categories_schema);
