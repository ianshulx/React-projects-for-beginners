const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");  
const jwt = require("jsonwebtoken");

// Register
router.post("/register" , async (req,res) => {

    const newUser = new User ({
        name:req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,process.env.SEC_KEY).toString(),
        isAdmin:req.body.isAdmin,
    });

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser)
    }
    catch(err){
        res.status(500).json(err);
    }
});

//Login
router.post("/login" , async (req,res) => {

    try {
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("Wrong Credentials");

        const bytes  = CryptoJS.AES.decrypt(user.password , process.env.SEC_KEY);
        const originalpassword = bytes.toString(CryptoJS.enc.Utf8);
        
        originalpassword !== req.body.password && res.status(401).json("Wrong Credentials");

        const accessToken = jwt.sign(
            {
            id:user._id,
            isadmin:user.isAdmin,
            },
            process.env.JWT_KEY,
            {expiresIn:"1d"}
        );

        const {password,...others}= user._doc;
 
        res.status(200).json({...others,accessToken});
    }
    catch(err){
        res.status(500).json(err)
    }
});




module.exports = router