const connectToMongo = require("./db")
const express = require("express")
const cors = require("cors")
connectToMongo()
const app = express()
const port = 7000
app.use(cors())


// importing routes from routes folder
app.use(express.json())
app.use("/api/auth" ,require("./routes/auth"))
app.use("/api/notes" ,require("./routes/notes"))
app.use("/api/userStats",require("./routes/usernotesinfo"))

app.listen(port,()=>{
    console.log(`App listening at http://localhost:${port}`)
})