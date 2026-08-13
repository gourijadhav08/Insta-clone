const jwt = require('jsonwebtoken')
async function identifyUser(req,res,next){
    
    const token = req.cookies.token

     if(!token){
        return res.status(401).json({
            message:"token not provided,Unauthorized access"
        })
     }
      let decoded = null

       try{
           decoded =  jwt.verify(token,process.env.JWT_SECRET)
       }catch(err){
           return res.status(401).json({
               message:"You not have access"
           })
       }

    req.user = decoded

    next()
}
 
module.exports = identifyUser