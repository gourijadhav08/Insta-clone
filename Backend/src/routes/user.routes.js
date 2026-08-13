const express = require("express")
const router = express.Router()
const { registercontroller, logincontroller } = require("../controllers/auth.controller")
const { followUserController } = require("../controllers/user.controller")

// Auth routes
router.post("/register", registercontroller)
router.post("/login", logincontroller)

// Follow route
const authMiddleware = require("../middleware/auth.middleware") // adjust path/name to match your file
const identifyUser = require("../middleware/auth.middleware")

router.post("/follower/:username", identifyUser, followUserController)

module.exports = router