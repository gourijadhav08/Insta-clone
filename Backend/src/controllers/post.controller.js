require("dotenv").config()
const usermodel= require("../model/post.model")
const Imagekit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const PostModel = require("../model/post.model")
const jwt = require("jsonwebtoken")


const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createpostcontroller(req,res){
  
    console.log(decoded)

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName: "Test"
    })

    const post = await PostModel.create({
        caption:req.body.caption,
        image:file.url,
        user:req.user.id,
        folder:"summer of code.png"
    })

    res.status(201).json({
        message:"post created successfully.",
        post
    })
}

async function getPostController(req,res){
 

    const userId = req.user.id

    const post=await PostModel.find({
        user:userId
    })

    res.status(200).json({
        message:"Post fetched successfully.",
        post
    })
}

async function getPostDetailsController(req,res){
    
  

    const userId = req.user.id 
    const postId = req.params.postId

    const post = await PostModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"Post not found.",
            post
        })
    }

    const isValidUser = post.user.toString() === userId

    if(!isValidUser) {
        return res.status(403).json({
            message:"Forbidden Content."  
        })
    }

    return res.status(200).json({
        message:"Post fetched succesfully.",
        post
    })
}

module.exports = {
    createpostcontroller,
    getPostController,
    getPostDetailsController
}