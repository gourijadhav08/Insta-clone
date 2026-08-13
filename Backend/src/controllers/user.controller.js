const followmodel = require("../model/follow.model")
async function followUserController(req, res){

    // ✅ Get from JWT/auth (the logged-in user)
    const followerUsername = req.user.username  // From auth middleware
    
    // ✅ Get from URL (who to follow)
    const followeeUsername = req.params.username

    const followRecord = await followmodel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord
    })
}

module.exports = {
    followUserController
}