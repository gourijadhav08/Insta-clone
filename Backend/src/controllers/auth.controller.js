const usermodel = require("../model/use.model")
const bcrypt = require('bcrypt')  
const jwt = require("jsonwebtoken")


async function registercontroller(req,res){
    const{email,username,password,bio,profileImage} = req.body

     const isuserAlreadyExists = await usermodel.findOne({
        $or:[
            {username},
            {email}
        ]
     })

     if(isuserAlreadyExists){
        return res.status(409).json({
            message:"user already exists" + (isuserAlreadyExists.email==email?"email already exists":"username already exit")
        })
     }

     const hash = await bcrypt.hash(password,10)
       
     const user = await usermodel.create({
        username,
        email,
        bio,
        profileImage,
        password:hash
     })

     const token = jwt.sign({
       id:user._id,
       username:user.username
     }, 
     process.env.JWT_SECRET, 
     {expiresIn:"1d"})

    res.cookie("token",token).status(201).json({
        message:"user Registered Successfully",
        user:{
             email: user.email,
             username: user.username,
             Bio:user.Bio,
             profileImage:user.profileImage,
        }
    })
}

async function logincontroller(req,res){
    const{username,email,password} = req.body

    const user = await usermodel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(!user){
        return res.status(400).json({
            message:"user not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if(!isPasswordValid){
        return res.status(401).json({
            message:"password invalid"
        })
    }

    const token = jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token).status(200).json({
        message:"user loggedIn successfully.",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

module.exports = { registercontroller, logincontroller }
