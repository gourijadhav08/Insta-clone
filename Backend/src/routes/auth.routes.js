const express = require("express")
const usermodel = require("../model/use.model")

const authRouter = express.Router()

authRouter.post('/register',(req,res)=>{
    const{email,username,password,bio,profileImage} = req.body

    const isuserExitByEmail = await usermodel.findone({email})

    if (isuserExitByEmail){
        return res.status(409).json({
            message:"this email already exit"
        })
    }

  const isuserExitByUsername = await usermodel.findone({username})

   if(isuserExitByUsername){
    return res.status(409).json({
        message:"user already exites by username"
    })
   }

})

