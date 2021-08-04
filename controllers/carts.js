const mcart = require('../database_model_schemas/cart');
const morders = require('../database_model_schemas/orders');
const mpurchases = require('../database_model_schemas/purchaseitems');
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://restaurantappuser:ishu@777@cluster0.2vfor.mongodb.net/restaurantdb?retryWrites=true&w=majority')
        .then(()=>{
          console.log('CONNECTED TO DATABASES');
        })
        .catch(()=>{
          console.log('ERROR CANNOT CONNECTED TO DATABASE');
        });

exports.addNewCart = (req,res,next) => {

  mongoose.connection.db.listCollections({name: 'mcarts'})
    .next(function(err, collinfo) {
        if (collinfo) {
            console.log('Exists');
            mcart.findOne({inputUserId:req.body.userid,inputItemId:req.body.itemid})
              .then((result)=>{
                if(result) {
                  console.log("Updating cart as new");
                  qty = result.inputQuantity + req.body.qty_data;
                  new_cart = new mcart({
                    '_id':result._id,
                    'inputTableId' : req.userData.tableid,
                    'inputItemId' : result.itemid,
                    'inputQuantity' : qty,
                    'inputUserId' : req.userData.userid,
                    'inputPrice' : result.unitprice,
                  });
                  mcart.updateOne({inputUserId:req.body.userid,inputItemId:req.body.itemid},new_cart)
                      .then((result)=>{
                        console.log(result);
                        if(result.n>0) {
                          res.status(201).json({
                            message:'CART UPDATED',
                            cart:result
                          });
                        } else {
                          res.status(401).json({
                            message:'Updation Error'

                          });
                        }
                      })

                } else {
                  console.log("Inserted into cart as new");
                  new_cart = new mcart({
                    'inputTableId' : req.userData.tableid,
                    'inputItemId' : req.body.itemid,
                    'inputQuantity' : req.body.qty_data,
                    'inputUserId' : req.userData.userid,
                    'inputPrice' : req.body.unitprice,
                  });
                  new_cart.save()
                          .then((result)=>{
                            res.status(200).json({
                              message : 'Data Inserted to Cart'
                            });
                          });
                }
              });

        } else {
            new_cart = new mcart({
              'inputTableId' : req.userData.tableid,
              'inputItemId' : req.body.itemid,
              'inputQuantity' : req.body.qty_data,
              'inputUserId' :req.userData.userid,
              'inputPrice' : req.body.unitprice,
            });
            new_cart.save()
                    .then((result)=>{
                      res.status(200).json({
                        message : 'Data Inserted to Cart'
                      });
                    });
        }
    });





}

exports.getCartItems = (req,res,next) => {
    mcart.find({inputUserId:req.userData.userid})
        .populate({path : 'inputItemId', select : 'inputItemName _id'})
        .then((result)=>{
          if(result) {
            res.status(200).json({
              message : 'Cart List',
              exists :1,
              clist : result
            });
          } else {
            res.status(200).json({
              message : 'No Cart Content Found',
              exists:0,
              clist : result
            });
          }
        })
}

exports.deleteCartItem = (req,res,next) => {
  const userid=req.userData.userid;
  const itemid=req.params.itemid;
  mcart.deleteOne({inputItemId:itemid,inputUserId:userid})
       .then((result)=>{
        if(result.n>0) {
          res.status(200).json({
            message:'Deleted'
          })
         } else {
          res.status(401).json({
            message:'Not Authorized'
          })
         }
       })
}

exports.deleteCart = (req,res,next) => {
  const userid=req.userData.userid;

  mcart.deleteMany({inputUserId:userid})
       .then((result)=>{
        if(result.n>0) {
          res.status(200).json({
            message:'Deleted'
          })
         } else {
          res.status(401).json({
            message:'Not Authorized'
          })
         }
       })
}


exports.performCartCheckout = (req,res,next) => {
  const userid=req.userData.userid;

    neworder = new morders({
      'inputTableId': req.userData.tableid,
      'inputUserId': req.userData.userid,
      'inputStatus': 'PENDING',
      'inputTotalCost' : req.body.inputTotalAmount

    });

    neworder.save()
            .then((result)=>{
              mcart.find({inputUserId:req.userData.userid})
                   .then((cartdata)=>{
                        console.log('UserCart Data is');
                        console.log(cartdata);
                        cartdata.forEach(eachcart=>{
                           newpurchase = new mpurchases({
                            'inputOrderId' : result._id,
                            'inputItemId' : eachcart.inputItemId,
                            'inputQuantity' : eachcart.inputQuantity,
                            'inputPrice' : eachcart.inputPrice
                           })
                           newpurchase.save()
                                      .then((pdata)=>{
                                        console.log('Purchase Added');
                                      })
                        })

                        mcart.deleteMany({inputUserId:req.userData.userid})
                              .then((result)=>{
                                if(result.n>0) {
                                  res.status(200).json({
                                    message:'Purchased Done'
                                  })
                                } else {
                                  res.status(401).json({
                                    message:'Error in Making Order'
                                  })
                                }
                              })

                   })
            })


}
