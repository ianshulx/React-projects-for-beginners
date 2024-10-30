const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("Your Api");
const express = require("express")
const router = express.Router()


run = async (prompt_) =>  {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
        
    const prompt = "Gemini Tell me abkut yourself"
    const result = await model.generateContent(prompt_);
    const response = await result.response;
    const text = response.text();
    return text.slice(0,text.indexOf("."))
}

// generating the reponse by gen ai at root /api/genai/generateresponse


router.post(
    "/generateresponse",
    async (req,res) => {
        try {
            console.log("yes")
            let responsefromai = await run(req.body.prompt_)
            let response = await fetch("http://localhost:5000/api/messages/addmsg",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json" 
                },
                body : JSON.stringify({sender : "ChatAi@GPT",receiver : req.body.WhoIsPropmting , message  : responsefromai})
            })
            let jso1  = await response.json()
            console.log(jso1)
            res.json({success : "yes"})
        } 
        catch (error) {
            res.json(error)
        }
    }
)

module.exports = router;
