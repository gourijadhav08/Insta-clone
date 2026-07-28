const express = require("express")
const usermodel = require("../model/use.model")
const crypto = require('crypto')
const jwt = require("jsonwebtoken")
const authRouter = express.Router()

authRouter.post('/register',(req,res)=>{
    const{email,username,password,bio,profileImage} = req.body

     const isuserAlreadyExists = await usermodel.findOne({
        $or:[
            {username},
            {email}
        ]
     })


     if(isuserAlreadyExists){
        return res.status(409)
        .json({
            message:"user already exists" + (isuserAlreadyExists.email==email?"email already exists":"username already exit")
        })
     }

     const hash = crypto.createHash('sha256').update(password).digest('hex')
       
     const user = await usermodel.create({
        username,
        email,
        bio,
        profileImage,
        password:hash
     })

     const token = jwt.sign
     ({
       id:user._id
     }
     ,process.env.JWT_SECRET,
     {expiresIn:"1d"}
    )

    res.cookie("token")
})

