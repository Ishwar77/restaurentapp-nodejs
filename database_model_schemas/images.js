const mongoose=require('mongoose');

const unique_validator = require('mongoose-unique-validator');

const images_schema = mongoose.Schema({
  'inputItemId' : {type:mongoose.Types.ObjectId,ref: 'mItems', require:true},
  'inputImageName' : {type:String,require:true}
});

images_schema.plugin(unique_validator);

module.exports = mongoose.model('mimages',images_schema);
