const mongoose = require("mongoose")
const {Schema} = mongoose;
const FriendsSchema = new Schema ({
    KiskaFriend : {
        type  : "String",
        required : true
    },
    WhoisTheFriend : {
        type : "String",
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
})
const Friends = mongoose.model("friends",FriendsSchema)
module.exports = Friends