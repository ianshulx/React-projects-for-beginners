const express = require("express")
const User = require("../models/User")
const router = express.Router();
const {body,validationResult}  = require("express-validator")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "escapethematrix"
var fetchuser = require("../middleware/fetchuser")
const bcrpyt = require("bcryptjs")

// creating the user at root /api/authentication/createuser
router.post(
    "/createuser",
    [
        body("name","Enter a valid a name").isLength({min:5}),
        body("email","Enter a valid a email").isEmail(),
        body("password","Enter a valid a password , minimum length is 8").isLength({min:8})
    ],
    async (req,res) => {
        let success = false
        const err = validationResult(req)
        if (!err.isEmpty()) {
            return res.json({success,error : err.array()[0].msg})
        }
        try {
            let user = await User.findOne({email : req.body.email})
            if (user) {
                const  message = "Sorry a user already exists with this email"
                return res.status(400).json({
                    success,
                    error : message,
                })
            } 
            success = true
            const salt = await bcrpyt.genSalt(10)
            const securedPassword = await bcrpyt.hash(req.body.password,salt)
            user = await User.create({
                name : req.body.name,
                email : req.body.email,
                password : securedPassword,
                profilephoto : req.body.profilephoto
            })
            const payload = {
                user : {
                    id : user.id
                }
            }
            const authToken = jwt.sign(payload,JWT_SECRET)
            res.json({success,authToken,user})
        }
        catch(error){
            res.status(400).json({error : error.message})
        }
    }
)

// login the user at root /api/authentication/loginuser
router.post(
    "/loginuser",
    [
        body("email","Enter a valid email").isEmail(),
        body("password","Enter the valid password").isLength({min:8})
    ],
    async (req,res) => {
        let success = false
        const err = validationResult(req)
        if (!err.isEmpty()) {
            return res.json({erorr : err.array()})
        }
        try {
            const {email,password} = req.body
            // find the user 
            let user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({success,error : "Please login through correct credintials"})
            }
            const payload = {
                user : {
                    id : user.id
                }
            }
            const authToken = jwt.sign(payload,JWT_SECRET)
            const passwordCompare  =  await bcrpyt.compare(password,user.password)
            if (passwordCompare) {
                success = true
                return res.status(200).json({success,authToken})
            }
            else {
                return res.status(400).json({success,error : "Please login through correct credintials"})
            }
        }
        catch(error){
            res.status(401).json({success,errormessage: error.message})
        }
    }
)

// fetching  the user data at root /api/authentication/getuser

router.post(
    "/getuser",
    fetchuser, 
    async (req,res) => {
        let success = false
        try {
            const userId = req.user.id
            const user = await User.findById(userId).select("-password")
            success = true
               res.json(user)
        }
        catch(error){
            res.json({success,error : "hehehejii"}).status(400)
        }
    }
)

// fetching all user  at root /api/authentication/getuser
router.get(
    "/getalluser",
    async (req,res) => {
        User.find().then(users=> res.json(users))
    }
)

// fetching the user by mongoid  at root /api/authentication/fetchuserbyid
router.post(
    "/fetchuserbyid",
    async (req,res) => {
        let success = false
        try {
            const user = await User.findById(req.body._id)
            success = true
            res.json({success,user})
        } catch (error) {
            res.json({success,error : error.message}).status(400)
        }
    }
)

// fetching the user by email  at root /api/authentication/email
router.post(
    "/fetchuserbyemail",
    async (req,res) => {
        try {
            const user = await User.find().where({email : req.body.email}).select("_id")
            res.json(user)
        } 
        catch (error) {
            res.json(error).status(400)
        }
    }
)

module.exports = router;