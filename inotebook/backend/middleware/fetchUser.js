var jwt = require("jsonwebtoken")
const JWT_SECRET = "escapethematrix"

const fetchuser = (req,res,next) => {
    // GET THE USER FROM THE JWT USER AND ADD IT TO REQ
    const token = req.header("authToken")
    console.log(token);
    if (!token) {
        res.status(401).send("PLease authenticate using a valid token")
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user
        next()
    } 
    catch (error) {
        res.status(401).send("PLease authenticate using a valid token")
        
    }
}

module.exports = fetchuser