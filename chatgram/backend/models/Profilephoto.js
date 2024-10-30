const mongoose = require("mongoose")
const {Schema} = mongoose;
const photo = Schema({
    WhosPhoto : {
        type : String,
        required : true,
        unique : false,
    },
    Image : {
        type : String,
    },
    date : {
        type : Date,
        default : Date.now
    },
})
const Profilephoto = mongoose.model("profilephotos",NotificationSchema)
module.exports = Profilephoto