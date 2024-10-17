const express = require("express")
const router = express.Router();
const {body,validationResult}  = require("express-validator")
const Typing = require("../models/Typing")

// creating a new typing session at root /api/typing/addtyping
router.post(
    "/addtyping",
    async (req,res) => {
        try {
            // see wheter already a typing sessoin is begin or not
            let typing = await Typing.findOne({WhoisTheTyping : req.body.WhoisTheTyping , KismeTyping : req.body.KismeTyping})
            if (typing) {
                const  message = "Sorry a typing session has going on "
                return res.status(400).json({
                    erorr : {message},
                })
            } 
            typing = await Typing.create({
                WhoisTheTyping : req.body.WhoisTheTyping,
                KismeTyping : req.body.KismeTyping
            })
            res.json(typing)
        } 
        catch (error) {
            res.status(400).json({error : error.message})
        }
    }
)

// fetching the typing (or detection of typing for a user)
// at root /api/typing/detTyping
router.post(
    "/detTyping",
    async (req,res) => {
        try {
            let WhoisTheTyping = await Typing.find({KismeTyping : req.body.LoggedInAccount}).select("WhoisTheTyping")
            res.json(WhoisTheTyping)
        } 
        catch (error) {
            res.status(400).json({error : error.message})
        }
    }
)

// delting the typing session
// at root /api/typing/delTyping
router.delete(
    "/delTyping",
    async(req,res) => {
        try {
            let deletedtyping = await Typing.findOneAndDelete({WhoisTheTyping : req.body.WhoisTheTyping , KismeTyping : req.body.KismeTyping})
            res.json(deletedtyping)
        } 
        catch (error) {
            res.status(400).json({error : error.message})
        }
    }
)

module.exports = router;
