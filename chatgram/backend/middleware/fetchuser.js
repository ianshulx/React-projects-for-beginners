const jwt = require("jsonwebtoken")
const JWT_SECRET = "escapethematrix"
const fetchuser = (req,res,next) => {
    const authtoken = req.header('authToken')
    if (!authtoken) {
        return res.staus(400).send("Please bring up the  token")
    }
    try {
        const data = jwt.verify(authtoken,JWT_SECRET)
        req.user = data.user
        next()
    }
    catch {
        return res.status(401).send("hehehe")
    }
}

module.exports = fetchuser