const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const bcryptjs = require("bcryptjs");
var jwt = require("jsonwebtoken")
const JWT_SECRET = "escapethematrix"
var fetchuser = require("../middleware/fetchUser")
//  Route 1 : create a user by post root  at /api/auth/createuser

router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 5 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter a Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false
      const err = validationResult(req);
      // if there are errors , return bad request and error
    if (!err.isEmpty()) {
      return res.status(400).json({ success,err: err.array() });
    }
    //check whether the user already exits by email
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({
            success,
            error: "Sorry a user with this email address already exists",
          });
      }
      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(req.body.password,salt)
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
      });
      // }).then(user=>res.json(user))
      // .catch(err => {console.log(err),
      // res.json({err : "Please enter a unique email" , message : err.message})})
      const data = {
        user : {
            id : user.id
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET)
      success = true
      res.json({success,authToken})
    //   res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(400).send("some error ocuured")
    }
  }
);


// Route 2 ; Authnticate a usr at root /api/auth/login
router.post(
    "/login",
    [
      body("email", "Enter a valid Email").isEmail(),
      body("password","Password can not be blanck").exists()
    ],
    async (req, res) => {
      let success = false
      const err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(400).json({ err: err.array() });
      }
      const {email,password} = req.body;
      try {
        let user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({error : "Please try to login with correct credentials"})
        }
        const passwordCompare = await bcrypt.compare(password,user.password)
        if (!passwordCompare) {
            return res.status(400).json({success , error : "Please try to login with correct credentials"})
        }
        const payload = {
            user : {
                id : user.id
            }
        }
        const authToken = jwt.sign(payload,JWT_SECRET)
        success = true
        res.json({success,authToken})
      } 
      catch (error) {
        console.error(error.message)
        res.status(400).send("some error ocuured in authenticat user")
      }
    })

// Route 3 : Get the details of logged in user at /api/auth/getuser

router.post(
    "/getuser",
    fetchuser,
    async (req, res) => {
        try {
            const userId = req.user.id
            const user = await User.findById(userId).select("-password") // - minus without it only all details , 
            console.log("user fetched")
            res.send(user)
        } 
        catch (error) {
            console.log("Some error occured in getuser")
        }
    })

module.exports = router;
