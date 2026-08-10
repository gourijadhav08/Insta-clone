const express = require("express")
const  postController = require("../controllers/post.controller")
const { createpostcontroller } = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})
const postRoute = express.Router()

postRoute.post("/",upload.single("image") ,createpostcontroller)

postRoute.get("/",postController.getPostController)

postRoute.get("/details/:postId", postController.getPostDetailsController)

module.exports = postRoute