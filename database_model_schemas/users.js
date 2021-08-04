const mongoose=require('mongoose');

const unique_validator = require('mongoose-unique-validator');

const users_schema = mongoose.Schema({
  'inputFname' : {type:String,require:true},
  'inputLname' : {type:String,require:true},
  'inputContact' :{type:String,require:true},
  'inputUsername' : {type:String, require:true, unique:true},
  'inputPassword' : {type:String,require:true},
  'inputRole' : {type:Number,require:true,default:2},
  'inputCreated' : {type:Date,default:Date.now()},
});

users_schema.plugin(unique_validator);

module.exports = mongoose.model('musers',users_schema);
