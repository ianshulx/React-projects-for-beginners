const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
    userid :{type:String, required:true},
    products : [
        {
            productId:{
                type:String,
            },
            quantity:{
                type:Number,
                default:1,
            },
        },
    ],

},
{timestamps:true}
);

module.exports = mongoose.model("Cart", CartSchema);