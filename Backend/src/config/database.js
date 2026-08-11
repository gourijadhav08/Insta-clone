const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to MongoDB")
    })
    .catch((err)=>{
        console.error("MongoDB connection failed:", err.message)
        process.exit(1)
    })
}

module.exports=connectToDb  
