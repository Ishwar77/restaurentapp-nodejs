const mongoose=require('mongoose');

const unique_validator = require('mongoose-unique-validator');

const rtables_schema = mongoose.Schema({
  'inputQrcode' : {type:String,require:true,unique:true},
  'inputTableno' : {type:String,require:true,unique:true}
});

rtables_schema.plugin(unique_validator);

module.exports = mongoose.model('mrtables',rtables_schema);
