const morders = require('../database_model_schemas/orders');
const mpurchases = require('../database_model_schemas/purchaseitems');
exports.getOrderList = (req,res,next) => {
  morders.find()
         .sort({created: 'desc'})
         .then((result)=>{
          res.status(201).json({
            message:'ORDERS LIST',
            olist:result
          });
         });
}

exports.getSingleOrderDetails = (req,res,next) => {
  oid=req.params.oid;
  morders.findOne({_id:oid})
         .then((result)=>{
          userid=result.inputUserId;
          tableid=result.inputTableId;
          mpurchases.find({inputOrderId:oid})
                    .populate({path : 'inputItemId', select : 'inputItemName -_id'})
                    .then((result)=>{
                      res.status(201).json({
                        message:'ORDERS DATA',
                        odata:result
                      });
                    })

         });
}

exports.serveorder = (req,res,next) => {
  oid=req.params.oid;
  morders.deleteOne({_id:oid})
         .then((result)=>{
          res.status(201).json({
            message:'ORDERS SERVING DONE',

          });
         })
}
