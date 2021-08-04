const mcategory = require('../database_model_schemas/categories');

exports.addNewCategory = (req,res,next) => {
  console.log('A REQUEST CAME HERE');
  const url = req.protocol + "://" +req.get('host');
  new_cat = new mcategory({
    'inputCategory': req.body.inputCategory,
    'inputCategoryImage': url + '/uploads/' + req.file.filename,
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


exports.getcategorylist = (req,res,next) =>{
  mcategory.find()
           .then((clistdata)=>{
             res.status(200).json({
               message : 'Data Fetched',
               clist : clistdata
             })
           });
}

exports.getsinglecategory = (req,res,next) =>{
  catid=req.params.id;
  mcategory.findById(catid)
           .then((cdata)=>{
             if(cdata) {
              res.status(200).json({
                message : 'Data Fetched',
                cdata : cdata
              });
             } else {
              res.status(404).json({
                message : 'Error Fetching Category'

              });
             }

           });
}
