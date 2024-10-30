const Order = require("../models/Order")
const router = require("express").Router(); 
const {verifyToken,verifyAndAuth, verifyAndAdmin} = require("./verify");

//Create Order
router.post('/',verifyToken ,async (req,res)=>{
    const newOrder = new Order(req.body);

    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }
    catch(err){
        res.status(500).json(err);
    }
})




//Update user order
router.put('/:id', verifyAndAdmin, async (req,res) => {
    try{
        const updateOrder = await Order.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },{new:true});

        res.status(200).json(updateOrder)
    }
    catch(err){
        console.log("Error on user route");
    }

});



// //Delete order

router.delete('/:id',verifyAndAdmin ,async (req,res) => {
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted");
    }
    catch(err){
        res.status(500).json(err);
    }
});


// //Get user orders
router.get('/find/:userId',verifyAndAuth, async (req,res) => {
    try{
        const orders = await Order.find({userId:req.params.userId});
        res.status(200).json(orders);
    }
    catch(err){
        res.status(500).json(err);
    }   
});

// //Get all user orders
router.get('/',verifyAndAdmin ,async (req,res) => {
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    }
    catch(err){
        res.status(500).json(err);
    }   
});


//Get montly income
router.get("/income", verifyAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;







