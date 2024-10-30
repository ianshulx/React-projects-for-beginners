const mongoose = require("mongoose")
const {Schema} = mongoose;
const NotificationSchema = Schema({
    fromEmail : {
        type : String,
        required : true,
        unique : false,
    },
    toEmail : {
        type : String,
        required : true,
        unique : false
    },
    date : {
        type : Date,
        default : Date.now
    },
})
const Notificaion = mongoose.model("notification",NotificationSchema)
module.exports = Notificaion