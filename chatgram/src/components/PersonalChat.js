import React, { useEffect } from 'react'
import "../stylesheets/Personalchat.css"
import { useContext} from 'react'
import Chattingornot from '../context/ChattingornotContext'
import SocketContext from '../context/SocketContext';
function PersonalChat() {
  const context = useContext(Chattingornot)
  const context1 = useContext(SocketContext)
  const {socket} = context1
  const {chatting,setchatting,chattingwith,setchattingwith,setjustHasCameOnTheChatPage,convertUTCToIST} = context
      useEffect(()=>{
            socket.on("newMessage",(msg)=>{
              if(msg.receiver === localStorage.getItem('email')) {
                const element = document.querySelector(".lastmsg"+msg.sender.slice(0,msg.sender.indexOf('@')))
                if(msg.message.length >= 38){
                  element.innerHTML = msg.message.slice(0,38) + ".."
                }
                else {
                  element.innerHTML = msg.message
                }
                  if(msg.sender === localStorage.getItem("chattingwith")) {
                    console.log("yesss")
                    const newdiv1 = document.createElement("div")
                    newdiv1.className = "receivedchats"
                    const newdiv2 = document.createElement("div")
                    newdiv2.className = "receivedmsg"
                    newdiv2.innerHTML = msg.message
                    const newdiv3 = document.createElement("div")
                    newdiv3.className = "timestamp"
                    newdiv3.innerHTML = convertUTCToIST(msg.timestamp)
                    newdiv1.appendChild(newdiv2)
                    newdiv1.appendChild(newdiv3)
                    const rchats = document.querySelector(".chats")
                    rchats.appendChild(newdiv1)
                  }
              }
            })
          return ()=> {
            socket.off("newMessage")
          }
      },[]) 
  const fetchAllMsgs = async () => {
    let response = await fetch("http://localhost:5000/api/messages/fetchallmsgs",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({sender : localStorage.getItem("email") , receiver : chattingwith})
    })
    let totalchat   = await response.json()
    console.log(totalchat)
    for (let index = 0; index < totalchat.length; index++) {
      const element = totalchat[index];
      if(element.sender === chattingwith) {
        const chats = document.querySelector(".chats")
        const newdiv1 = document.createElement("div")
        newdiv1.className = "receivedchats" 
        const newdiv2 = document.createElement("div")
        newdiv2.className = "receivedmsg"
        newdiv2.innerHTML = element.message
        const newdiv3 = document.createElement("div")
        newdiv3.className = "timestamp"
        newdiv3.innerHTML = convertUTCToIST(element.timestamp)
        newdiv1.appendChild(newdiv2)
        newdiv1.appendChild(newdiv3)
        chats.appendChild(newdiv1)
      }
      else {
        const chats = document.querySelector(".chats")
        const newdiv1 = document.createElement("div")
        newdiv1.className = "sentchats"
        const newdiv2 = document.createElement("div")
        newdiv2.className = "sentmsg"
        newdiv2.innerHTML = element.message
        const newdiv3 = document.createElement("div")
        newdiv3.className = "timestamp"
        newdiv3.innerHTML = convertUTCToIST(element.timestamp)
        newdiv1.appendChild(newdiv2)
        newdiv1.appendChild(newdiv3)
        chats.appendChild(newdiv1)
      }
    }
  }
  if(chatting){
    fetchAllMsgs()
  }
  const handlebackIcon = () => {
    setchatting(false)
    setchattingwith("")
    setjustHasCameOnTheChatPage(true)
    localStorage.removeItem("chattingwith")
  }
  const handleonchageoninputmsg= async(event) => {
    event.preventDefault()
    // closed temp ===============>
    // if(document.getElementById("msgToSend").value !== "") {
    //   let response = await fetch("http://localhost:5000/api/typing/addtyping",{
    //     method : "POST",
    //     headers : {
    //       "Content-Type" : "application/json"
    //     },
    //     body : JSON.stringify({WhoisTheTyping : localStorage.getItem("email") , KismeTyping : chattingwith})
    //   })
    //   let json = await response.json()
    // }
    // else {
    //   let response = await fetch("http://localhost:5000/api/typing/delTyping" , {
    //     method : "DELETE" ,
    //     headers : {
    //       "Content-Type" : "application/json"
    //     },
    //     body : JSON.stringify({WhoisTheTyping : localStorage.getItem("email") , KismeTyping : chattingwith})
    //   })
    //   let json = await response.json()
    // }
    // closed temp ===============>
  }
  const handlesendmsg = async (event) => {
    event.preventDefault()
    console.log("kuch karo when sendmsg")
    const chats = document.querySelector(".chats")
    console.log(chats)
    const newdiv1 = document.createElement('div')
    newdiv1.className = "sentchats"
    const newdiv2 = document.createElement("div")
    newdiv2.className = 'sentmsg'
    newdiv2.innerHTML = document.getElementById("msgToSend").value
    const newdiv3 = document.createElement("div")
    newdiv3.className = "timestamp"
    newdiv3.innerHTML = convertUTCToIST(Date.now())
    newdiv1.appendChild(newdiv2)
    newdiv1.appendChild(newdiv3)
    chats.appendChild(newdiv1)
    let response = await fetch("http://localhost:5000/api/messages/addmsg", {
      method : "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({sender : localStorage.getItem("email") , receiver : chattingwith , message : document.getElementById("msgToSend").value})
    })
    if(document.getElementById("msgToSend").value.length >= 26){
      document.querySelector(".lastmsg" + localStorage.getItem("chattingwith").slice(0,localStorage.getItem("chattingwith").indexOf("@"))).innerHTML = document.getElementById("msgToSend").value.slice(0,26) + ".."
    }
    else{
      console.log(localStorage.getItem("chattingwith").slice(0,localStorage.getItem("chattingwith").indexOf("@")));
      document.querySelector(".lastmsg" + localStorage.getItem("chattingwith").slice(0,localStorage.getItem("chattingwith").indexOf("@"))).innerHTML = document.getElementById("msgToSend").value
    }
    let json = await response.json()
    if(chattingwith === "ChatAi@GPT") {
      console.log("yes")
      let response = await fetch("http://localhost:5000/api/genai/generateresponse",{
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({WhoIsPropmting : localStorage.getItem("email")  , prompt_ : document.getElementById("msgToSend").value})
      })
    }
    document.getElementById("msgToSend").value = ""
    // typing close ------------>
    // let response1 = await fetch("http://localhost:5000/api/typing/delTyping",{
    //   method : "DELETE",
    //   headers : {
    //     "Content-Type" : "application/json"
    //   },
    //   body : JSON.stringify({WhoisTheTyping : localStorage.getItem("email"),KismeTyping : chattingwith})
    // })
    // let json1 = await response1.json()
    // detecting typeing ---------> closed temp
  }
  const handlesearchicon = () => {
    console.log("kuch laro");
    document.querySelector(".videocall").classList.toggle("hide")
    document.querySelector(".phonecall").classList.toggle("hide")
    document.querySelector(".search-container").classList.toggle("hide")
  }
  const handlechangeinmsgsearch = (event) => {
    console.log(event.target.value);
    const chats = document.querySelectorAll(".chats")
  }
  return (
    <>
      {
        chatting === false ? 
        <div className='personalChatnot'>
          <div className="startchatimage"></div>
          <div className="startchatmsg">Select A Chat With Your Friend And Get Started</div>
          <div className="cinc">ChatGram Inc.</div>
        </div>
        :
        <div className='personalChat'>
          <div className="personbar">
            <div className="backicon" onClick={handlebackIcon}><i className="fa-solid fa-arrow-left"></i></div>
            <div className="displayperson">{chattingwith}</div>
              <div className="search-container hide">
                <input  placeholder="Search messages..." className='srchmsg' onChange={handlechangeinmsgsearch}/>
              </div>  
            <div className="videocall"><i className="fa-solid fa-video"></i></div>
            <div className="phonecall"><i className="fa-solid fa-phone-volume"></i></div>
            <div className="searchmsgs"><i className="fa-solid fa-magnifying-glass" onClick={handlesearchicon}></i></div>
          </div>
            <div className="chats">
            </div>
            <div className="chat-container">
              <div className="inputmsgdiv">
                <button className="mediaattchbtn"><i className="fa-solid fa-paperclip"></i></button>
                <input type="text" placeholder={`Mesaage ${chattingwith}`} onChange={handleonchageoninputmsg} id="msgToSend"/>
                <button className="sendmsg" onClick={handlesendmsg}><i className="fa-solid fa-paper-plane"></i></button>
              </div>
            </div>
        </div>
        
      }
    </>
  )
}

export default PersonalChat