const express = require("express")
const router = express.Router()
const {body,validationResult} = require("express-validator")
const NotesStats = require("../models/NotesStats")
const { useSearchParams } = require("react-router-dom")



// Route 1 : Create Stats When SignUp
router.post("/createStats",
    async (req,res)=>{
        try {
            let success = true
            let status = 200
            let email = req.body.email
            let updatedNotes = 0 , deletedNotes = 0 , totalNotes = 0
            let createStatrForEmail = NotesStats.create({
                email : email,
                totalNotes : totalNotes,
                updatedNotes : updatedNotes,
                deletedNotes : deletedNotes
            })
            res.json({success :  success, status : status})
        }
        catch {
            let success = false
            let status = 500 
            res.json({success :  success, status : status})
        }
})

// Route 2 : Create A route for fetch Stats

router.post("/fetchStats",
    async (req,res)=>{
        try {
            let success = true
            let status = 200
            console.log("fetching")
            const {email} = req.body
            console.log(email)
            let user = await NotesStats.findOne({email : email})
            if(user) {
                res.json({ success :  success , status : status , userStats : user})
            }
            else {
                throw("User Not Found")
            }
        }
        catch (catchedError) {
            let success = false
            let status = 500 
            res.json({success :  success, status : status  , error : catchedError})
        }
})

// Route 3 == Update Data

router.post("/updateStats",
    async (req , res) => {
        try {
            let { email, type } = req.body;
            let userStats = await NotesStats.findOne({ email });
            if (!userStats) {
                throw new Error("User does not exist");
            }
            let { totalNotes, updatedNotes, deletedNotes } = userStats;
            if (type === "delete") {
                totalNotes -= 1;
                deletedNotes += 1;
            } else if (type === "update") {
                updatedNotes += 1;
            }
            else {
                totalNotes += 1;
            }
            const updatedStats = await NotesStats.findOneAndUpdate(
                { email },
                { $set: { totalNotes, updatedNotes, deletedNotes } },
                { new: true } 
            );
            res.status(200).json({ success: true, status: 200, data: updatedStats });
        } catch (error) {
            console.error("Error updating stats:", error);
            res.status(500).json({ success: false, status: 500, error: error.message });
        }
    }
)

module.exports = router
