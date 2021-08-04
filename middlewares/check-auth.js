const jwt=require('jsonwebtoken');
module.exports= (req,res,next) =>{
   try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken=jwt.verify(token,'restaurantapp');
    req.userData={ userid:decodeToken.userid,
                   user_role:decodeToken.user_role,
                   tableid:decodeToken.tableid
                  };
    console.log(req.userData);
    next();
   }
   catch ( error) {
     res.status(401).json({
       message :'Auth Failed'
     })
   }



}
