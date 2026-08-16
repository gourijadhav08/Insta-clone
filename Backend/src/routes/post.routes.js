const express = require("express")
const  postController = require("../controllers/post.controller")
const { createpostcontroller } = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})
const identifyUser = require("../middleware/auth.middleware")
const postRoute = express.Router()

postRoute.post("/",upload.single("image"), identifyUser ,postController.createpostcontroller)

postRoute.get("/",identifyUser,postController.getPostController)

postRoute.get("/details/:postId",identifyUser ,postController.getPostDetailsController)


postRoute.post("/like/:postId",identifyUser,postController.likePostController)

module.exports = postRoute