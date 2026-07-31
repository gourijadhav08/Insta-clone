const express = require("express")
const authcontroller = require("../controllers/auth.controller")
const authRouter = express.Router()

authRouter.post('/register', authcontroller.registercontroller)


authRouter.post("/login", authcontroller.logincontroller)
module.exports = authRouter