const Product = require("../models/Product")
const router = require("express").Router(); 
const {verifyAndAuth, verifyAndAdmin} = require("./verify");

//Create products
router.post('/',verifyAndAdmin ,async (req,res)=>{
    const newProduct = new Product(req.body);

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }
    catch(err){
        res.status(500).json(err);
    }
})




//Update product
router.put('/:id', verifyAndAdmin, async (req,res) => {
    try{
        const updateProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },{new:true});

        res.status(200).json(updateProduct)
    }
    catch(err){
        console.log("Error on user route");
    }

});



// //Delete product

router.delete('/:id',verifyAndAdmin ,async (req,res) => {
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted");
    }
    catch(err){
        res.status(500).json(err);
    }
});


// //Get product
router.get('/find/:id', async (req,res) => {
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json(err);
    }   
});

//Get product by name
router.get('/search', async (req, res) => {
    try {
      const productName = req.query.title;
      console.log(productName);
      const products = await Product.find({ title: { $regex: productName, $options: 'i' } });
      console.log(products);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });


// //Get all product
router.get('/' ,async (req,res) => {
    try{
        const qnew = req.query.new;
        const qCategory = req.query.categories;
        let products ;
        if(qnew){
            products = await Product.find().sort({createdAt:-1}).limit(5);
        }
        else if(qCategory){
            products = await Product.find({
                categories:{
                    $in : [qCategory],
                },
            });
        }
        else {
            products = await Product.find();
        }
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json(err);
    }   
});



module.exports = router;











