const User = require("../models/User")
const router = require("express").Router(); 
const {verifyAndAuth, verifyAndAdmin} = require("./verify");


//Update user
router.put('/:id', verifyAndAuth , async (req,res) => {
    if(req.body.password){
        req.body.password= CryptoJS.AES.encrypt(req.body.password,process.env.SEC_KEY).toString();
    }

    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },{new:true});

        res.status(200).json(updateUser)
    }
    catch(err){
        console.log("Error on user route");
    }

});

module.exports = router;



//Delete user

router.delete('/:id',verifyAndAuth ,async (req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    }
    catch(err){
        res.status(500).json(err);
    }
});


//Get user
router.get('/find/:id',verifyAndAdmin, async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password,...others}= user._doc;
        res.status(200).json(others);
    }
    catch(err){
        res.status(500).json(err);
    }   
});


//Get all user
router.get('/',verifyAndAdmin ,async (req,res) => {
    try{
        const query = req.query.new;
        const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
        res.status(200).json(users);
    }
    catch(err){
        res.status(500).json(err);
    }   
});















