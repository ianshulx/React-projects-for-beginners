const mongoose = require('mongoose');

const typing = new mongoose.Schema({
    WhoisTheTyping : {
        type: String,
        required: true,
    },
    KismeTyping : {
        type : String,
        required : true
    },
    timestamp: {
        type: Date,
        default: Date.now
      }
})

const  Typing = mongoose.model('typingdetection', typing);

module.exports  = Typing