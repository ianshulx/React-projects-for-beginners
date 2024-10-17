const express = require("express")
const User = require("../models/User")
const router = express.Router();

// fetching all user  at root /api/fetchdatabse/getuser

router.get(
    "/users",
    async (req,res) => {
        let allusers = await User.find().select("-password")
        return res.json(allusers)
    }
)


module.exports = router;