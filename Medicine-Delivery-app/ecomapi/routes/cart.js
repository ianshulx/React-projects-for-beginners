const Cart = require("../models/Cart")
const router = require("express").Router(); 
const {verifyToken,verifyAndAuth, verifyAndAdmin} = require("./verify");

//Create Cart
router.post('/',verifyToken ,async (req,res)=>{
    const newCart = new Cart(req.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }
    catch(err){
        res.status(500).json(err);
    }
})




//Update user Cart
router.put('/:id', verifyAndAuth, async (req,res) => {
    try{
        const updateCart = await Cart.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },{new:true});

        res.status(200).json(updateCart)
    }
    catch(err){
        console.log("Error on user route");
    }

});



// //Delete product

router.delete('/:id',verifyAndAuth ,async (req,res) => {
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted");
    }
    catch(err){
        res.status(500).json(err);
    }
});


// //Get user cart
router.get('/find/:userId', async (req,res) => {
    try{
        const cart = await Cart.findOne({userId:req.params.userId});
        res.status(200).json(cart);
    }
    catch(err){
        res.status(500).json(err);
    }   
});


// // //Get all product
// router.get('/find/' ,async (req,res) => {
//     try{
//         const qnew = req.query.new;
//         const qCategory = req.query.category;
//         let products ;
//         if(qnew){
//             products = await Product.find().sort({createdAt:-1}).limit(5);
//         }
//         else if(qCategory){
//             products = await Product.find({
//                 categories:{
//                     $in : [qCategory],
//                 },
//             });
//         }
//         else {
//             products = await Product.find();
//         }
//         res.status(200).json(products);
//     }
//     catch(err){
//         res.status(500).json(err);
//     }   
// });



module.exports = router;











