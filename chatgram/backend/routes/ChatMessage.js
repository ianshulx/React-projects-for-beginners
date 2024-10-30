const express = require("express")
const ChatMessage = require("../models/ChatMessages")
const router = express.Router();
const {body,validationResult}  = require("express-validator")

// pushing a message at root /api/messages/addmsg

router.post(   
    "/addmsg",
    async (req,res) => {
        try {
            let msg  = await ChatMessage.create({
                sender : req.body.sender,
                receiver : req.body.receiver,
                message : req.body.message,
            })
            res.json(msg)
        } 
        catch (error) {
            res.status(400).json({error : error.message})
        }
    }
)

// fetching all messages for a receiver of a particular sender  at root /api/messages/fetchallmsgs
router.post(
    "/fetchallmsgs",
    async (req,res) => {
        try {
            let msgs1 = await ChatMessage.find().where({sender : req.body.sender , receiver : req.body.receiver}) 
            let msgs2= await ChatMessage.find().where({sender : req.body.receiver , receiver : req.body.sender}) 
            const totalchat = msgs1.concat(msgs2)
            totalchat.sort((a,b)=> new Date(a.timestamp) - new Date(b.timestamp))
            res.json(totalchat)
        } 
        catch (error) {
            res.status(400).json({error : error.message})
        }
    }
)


// fetching all messages for a receiver of a particular sender  at root /api/messages/fetchallmsgsforauser
router.post(
    "/fetchallmsgsforauser",
    async (req,res) => {
        try {
            let totalmsgs = await ChatMessage.find().where({receiver : req.body.receiver})
            totalmsgs.sort((a,b)=> new Date(a.timestamp) - new Date(b.timestamp))
            res.json(totalmsgs)
        } 
        catch (error) {
            res.status(400).json({error : error.message})
        }
    }
)

// for last typed msgs 
// stage 1 ==> fetchall freinds first 
// stage 2 ==> fetchall chats of all freinds

// at root /api/messages/lastsTyped
router.post(
    "/lastTyped",
    async (req,res) => {
        try {
            let success = false // no chats as been started
            let msgs1 = await ChatMessage.find().where({sender : req.body.sender , receiver : req.body.receiver}) 
            let msgs2= await ChatMessage.find().where({sender : req.body.receiver , receiver : req.body.sender}) 
            const totalchat = msgs1.concat(msgs2)
            if(totalchat.length === 0) {
                res.json({success:success})
            }
            else {
                success = true
                totalchat.sort((a,b)=> new Date(a.timestamp) - new Date(b.timestamp))
                res.json({success : success, lasttyped :  totalchat[totalchat.length-1].message})
            }
        } 
        catch (error) {
            res.status(400).json({error : error.message})
        }
    }
)

module.exports = router;
