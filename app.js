const express = require('express');
const mongoose = require('mongoose');
const app = express();
const body_parser = require('body-parser');
const path= require('path');

const categoryroutes = require('./routes/category');
const itemroutes = require('./routes/item');
const userroutes = require('./routes/users');
const cartroutes = require('./routes/carts');
const orderroutes = require('./routes/orders');
const orderserveroutes = require('./routes/orderserve');




// "MONGODBURL":"mongodb+srv://roopa:roopa@cluster0-hk3w3.mongodb.net/restaurantdb?retryWrites=true",

//mongoose.connect("mongodb+srv://yogi:JUNI9eGDUhE6MEAj@cluster0-adwni.mongodb.net/restaurantdb?retryWrites=true&w=majority",{ useUnifiedTopology: true  })

//mongodb+srv://yogi:JUNI9eGDUhE6MEAj@cluster0-adwni.mongodb.net/restaurantdb?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://restaurantappuser:ishu@777@cluster0.2vfor.mongodb.net/restaurantdb?retryWrites=true&w=majority", { useNewUrlParser: true })
        .then(()=>{
          console.log('CONNECTED TO DATABASES');
        })
        .catch(()=>{
          console.log('ERROR CANNOT CONNECTED TO DATABASE');
        });

mongoose.set("useCreateIndex", true);

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTION');
  next();
});

app.use(body_parser.json());

app.use(body_parser.urlencoded({extended:false}));

//When Hosted on Server
app.use("/uploads",express.static(path.join("uploads")));

//When on Local
//app.use("/uploads",express.static(path.join("serverbackend/uploads")));

app.use("/api/category",categoryroutes);
app.use("/api/item",itemroutes);
app.use("/api/users",userroutes);
app.use("/api/carts",cartroutes);
app.use("/api/orders",orderroutes);
app.use("/api/orders/serve",orderserveroutes);


module.exports = app;
