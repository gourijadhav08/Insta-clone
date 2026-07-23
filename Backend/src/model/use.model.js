const mongoose = require("mongoose")


const userschema = new mongoose.schema({
         username:{
            type:String,
            unique:[true,"This already exit"],
            required:[true,"user name is required"]
            },
         email:{
             type:String,
             unique:[true,"This email already exit"],
             required:[true,"Have to give emial"]
         },

            password:{
               type:String,
               required:[true,"password is IMP to create the account"]
            },
            Bio:String,
            profileImage:{
               type:String,
               default:"https://ik.imagekit.io/vajbm4iry/insta-img"
            }

})

const usermodel = mongoose.model("users",userschema)

module.exports = usermodel