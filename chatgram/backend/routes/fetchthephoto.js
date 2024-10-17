const express = require("express")
const User = require("../models/User")
const router = express.Router();

// fetching the base64 , of a user at root /api/photo/fetchbase"
router.post(
    "/fetchbase",
    async (req,res) => {
        try {
            let base64 = await User.find({email : req.body.email}).select("profilephoto")
            res.json(base64)
        } 
        catch (error) {
            res.json({error : error})
        }
    }
)
module.exports = router;
