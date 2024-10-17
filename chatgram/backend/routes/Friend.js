const express = require("express")
const Friends = require("../models/Friends")
const router = express.Router();
const {body,validationResult}  = require("express-validator")

//creating a Twofriend at root /api/friends/createTwofriend
router.post(
    "/createTwoFriends",
    [
        body("KiskaFriend","Enter A Kiska Friend").isEmail(),
        body("WhoisTheFriend","Enter A Kon Friend").isEmail()
    ],
    async (req,res) => {
        try {
            let i1  = await Friends.create({
                KiskaFriend : req.body.KiskaFriend,
                WhoisTheFriend : req.body.WhoisTheFriend
            })
            let i2  = await Friends.create({
                KiskaFriend : req.body.WhoisTheFriend,
                WhoisTheFriend : req.body.KiskaFriend
            })
            res.json({i1,i2})
        }
        catch(error){
            res.josn(error)
        }
    }
)

// fetching All friends for a User
// means Displaying the WhoIsThefriend Of a Kiskafriend
// at root /allFriendsForAUser

router.post(
    "/allFriendsForAUser",
    [
        body("KiskeFriends","Enter A valid Email").isEmail()
    ],
    async (req,res) => {
        try {
            let allFriends = await Friends.find().where({KiskaFriend : req.body.KiskeFriends})
            res.json(allFriends)
        } 
        catch (error) {
            res.json(error)
        }
    }
)

// deleting the requsets if a user accpets it
// at root /api/friends/createTwofriend/deleteTwoFriendReqs
router.delete(
    "/deleteTwoReqs/:id1",
    async (req,res) => {
        try {
            const {id1} = req.params
            let req1 = await Friends.findByIdAndDelete(id1)
            res.json(req1)
        } catch (error) {
            res.json(error)
        }
    }
)

module.exports = router;
