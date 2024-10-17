const express = require("express")
const Notifications = require("../models/Notifications");
const router = express.Router();
const {body,validationResult}  = require("express-validator")

// pushing a freindnotification at root /api/notifications/addfriend

router.post(
    "/addfriend",
    [
        body("fromEmail","Enter a valid email").isEmail(),
        body("toEmail","Enter a valid email").isEmail()
    ],
    async (req,res) => {
        try {
            let successforAddfriend = true
            let notification = {
                fromEmail : "",
                toEmail : "",
            }
            let notifications = await Notifications.find().where({fromEmail:req.body.fromEmail})
            for(let i = 0 ; i < notifications.length ; i++){
                const element = notifications[i]
                if (element.fromEmail === req.body.fromEmail && element.toEmail === req.body.toEmail) {
                    successforAddfriend = false
                    break
                }
                else {}
            }
            if(successforAddfriend) {
                notification = await Notifications.create({
                    fromEmail : req.body.fromEmail,
                    toEmail : req.body.toEmail
                })
                res.json({successforAddfriend,notification})
            }
            else {
                res.status(400).json({successforAddfriend,error : "Notification Already Added"})
            }
        }
        catch (error) {
            res.status(400).json({error : error.message})
        }
    }
)

// fetching all notifications at root /api/notifications/allrequests
router.post(
    "/allrequests",
    async (req,res) => {
        try {
            let allrequests = await Notifications.find().select("-__v")
            res.json(allrequests)
        } catch (error) {
            res.status(400).json({error : error.message})
        }
    }
)


// fetching all addfriend from request of a from user at root /api/notifications/allFromUserRequestForaUser == for a particular user
router.post(
    "/allFromUserRequestForaUser",
    [
        body("fromEmail","Enter A valid from Email").isEmail()
    ],
    async (req,res) => {
        try {
            let allFromRequests  = await Notifications.find().where({fromEmail:req.body.fromEmail})
            res.json(allFromRequests)
        } 
        catch (error) {
            res.status(400).json({error : error.message})
        }
    }
)


// fetching all addfriend to request of a to user at root /api/notifications/allToUserRequestForauser == for a particular user
router.post(
    "/allToUserRequestsForaUser",
    [
        body("toEmail","Enter A valid Email").isEmail()
    ],
    async (req,res) => {
        try {
            let allToRequests  = await Notifications.find().where({toEmail:req.body.toEmail})
            res.json(allToRequests)
        } catch (error) {
            res.status(400).json({error : error.message})
        }
    }
)

// deleting a notificationOf Freind req ar root 
// this will happen when a user will accept another user's req

router.delete(
    "/deleteTheReq",
    [
        body("fromEmail","Enter A valid frokm Email").isEmail(),
        body("toEmail","Enter a valid toEmail").isEmail()
    ],
    async (req,res) => {
        let reqToDelete = await Notifications.findOneAndDelete().where({fromEmail : req.body.fromEmail , toEmail : req.body.toEmail})
        res.json(reqToDelete)
    }
)

module.exports = router;
