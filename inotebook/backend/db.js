const mongoose = require("mongoose")
const mongoURI = "dbStr"

const connectToMongo = () => {
    mongoose.connect(mongoURI)
    console.log("Connected to mongo");
}

module.exports  = connectToMongo;