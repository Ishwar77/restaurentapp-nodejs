const mitem = require('../database_model_schemas/items');

exports.addNewItem = (req,res,next) => {
  console.log('A REQUEST CAME HERE');
  const url = req.protocol + "://" +req.get('host');
  new_cat = new mitem({
    'inputCatagory' :req.body.inputCategory,
    'inputItemName' : req.body.inputItemName,
    'inputDescription' : req.body.inputDescription,
    'inputIngridients' : req.body.inputIngridients,
    'inputHealthBenifits' : req.body.inputHealthBenifits,
    'inputIsVeg' : req.body.inputIsVeg,
    'inputItemImage' : url + '/uploads/' + req.file.filename,
    'inputUnitPrice' : req.body.inputUnitPrice
  });
  new_cat.save()
         .then((result)=>{
           res.status(200).json({
             message:'Data Inserted Successfully',
             cat_id:result._id
           })
         })
         .catch((error) => {
          console.log(error.message);
          var e_mesg = Buffer.from(error.message);
               if(e_mesg.indexOf('unique')>=0) {
                error.message = 'Category is Already Registered';
                res.status(404).json({
                  message :  'Category is Already Registered',
                  error : error
                })
               } else {
                res.status(404).json({
                  message :  'Error in Insertion',
                  error : error
                })
               }
         });
}


exports.getitemlist = (req,res,next) =>{
  mitem.find()
           .then((clistdata)=>{
             res.status(200).json({
               message : 'Data Fetched',
               ilist : clistdata
             })
           });
}

exports.getcategoryitemlist = (req,res,next) =>{
  catid=req.params.catid;
  mitem.find({inputCatagory:catid})
           .then((ilistdata)=>{
             res.status(200).json({
               message : 'Data Fetched',
               ilist : ilistdata
             })
           });
}
