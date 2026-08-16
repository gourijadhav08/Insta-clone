const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({  
    follower:{
        type: String,  
         
    },
    followee:{
        type: String, 
    
    },
    status:{
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }
}, {
    timestamps: true  
})

followSchema.index({ follower: 1, followee: 1 }, { unique: true })
const Follow = mongoose.model("Follow", followSchema)
module.exports = Follow