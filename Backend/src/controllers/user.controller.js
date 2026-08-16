const followmodel = require("../model/follow.model")
async function followUserController(req, res){

    
    const followerUsername = req.user.username  
    const followeeUsername = req.params.username

    if(followerUsername === followeeUsername){
        return res.status(400).json({
            message:"You cannot follow yourself."
        })
    }
  
        const isFolloweeExists = await usermodel.findOne({
               username: followeeUsername
        })

       if(!followeeUsername===followerUsername){
        return res.status(404).json({
            message:"User you are trying to follow not found."
        })
    }
    const isAlreadyFollowing = await followmodel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })
  

    if(isAlreadyFollowing){
        return res.status(400).json({
            message:`You are already following ${followeeUsername}`,
            follow: isAlreadyFollowing
        })
    }

  


    const followRecord = await followmodel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord
    })
}


async function unfollowUserController(req, res){
      const followerUsername = req.user.username
    


      const isUserFollowing = await followmodel.findOne({
        follower: followerUsername,
        followee: followeeUsername
      })

      if(!isUserFollowing){
        return res.status(400).json({
            message:`You are not following ${followeeUsername}`
        })
      }

      await followModel.findByIdAndDelete(isUserFollowing._id)

       res.status(200).json({
        message:`You have unfollowed ${followeeUsername}`
       })

        
    }
module.exports = {
    followUserController,
    unfollowUserController
}