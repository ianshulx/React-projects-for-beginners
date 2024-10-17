import React, { useState } from 'react'
import  "../stylesheets/ChatWith.css"
import { useContext,useEffect } from 'react'
import Chattingornot from '../context/ChattingornotContext'
import aiphoto from "../assets/ChatAi.jpg"
import SocketContext from '../context/SocketContext'
function ChatWith() {
    const context = useContext(Chattingornot)
    const context1 = useContext(SocketContext)
    const {socket} = context1
    const [chataiAlreadyfrd, setchataiAlreadyfrd] = useState(false)
    const [frds, setfrds] = useState([])
    const {chatting,setchatting,setchattingwith,justHasCameOnTheChatPage,setjustHasCameOnTheChatPage,chattingWithIndex, setchattingWithIndex,typing_, settyping_,totalreceviedmsgs, settotalreceviedmsgs} = context
    const handleOnClickOnAPersonDiv = (event) => {
        setchatting(true)
        localStorage.setItem("chattingwith",document.getElementById("personEmail"+event.target.id[event.target.id.length-1]).innerHTML)
        setchattingwith(document.getElementById("personEmail"+event.target.id[event.target.id.length-1]).innerHTML)
        setjustHasCameOnTheChatPage((justHasCameOnTheChatPage)=>{
            if(justHasCameOnTheChatPage){
                return false
            }
            else {
                document.querySelector(".chats").innerHTML = ""
            }
        })
    }
    useEffect(()=> {
        const fetchingAllFriends = async () => {
            let response = await fetch("http://localhost:5000/api/friends/allFriendsForAUser",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({KiskeFriends : localStorage.getItem("email")})
            })
            let friends = await response.json()
            setfrds(friends)
            if(friends.length === 0) {
                const frdsList = document.querySelector(".frdsList")
                const imagelogdiv = document.createElement("div")
                imagelogdiv.className = "nofrdsimg"
                const addfrdstextdiv  = document.createElement("div")
                addfrdstextdiv.className = "addfrdstxt"
                addfrdstextdiv.innerHTML = "No Friends , Add Them"
                frdsList.appendChild(imagelogdiv)
                frdsList.appendChild(addfrdstextdiv)
            }
            else {
                const frdsList = document.querySelector(".frdsList")
                for (let index = 0; index < friends.length; index++) {
                    const element = friends[index];
                    if(element.WhoisTheFriend === "ChatAi@GPT") {
                        setchataiAlreadyfrd(true)
                    }
                    const newdiv1 = document.createElement("div")
                    const newdiv2 = document.createElement("div")
                    const newdiv3 = document.createElement("div")
                    const newdiv4 = document.createElement("div")
                    const newdiv5 = document.createElement("div")
                    const newdiv6 = document.createElement("div")
                    const newdiv7 = document.createElement("div")
                    const newdiv8 = document.createElement("img")
                    newdiv6.className =  "onlinedot"
                    newdiv6.id = "dotid" + (index+1)
                    newdiv7.className = "profilephoto"
                    newdiv7.id = "photoid" + (index+1)
                    newdiv8.id = "photoid" + (index+1)
                    let response1 = await fetch("http://localhost:5000/api/photo/fetchbase",{
                        method : "POST",
                        headers : {
                            "Content-Type" : "application/json"
                        },
                        body : JSON.stringify({email:element.WhoisTheFriend})
                    })
                    let json1 = await response1.json()
                    if(json1.length === 0) {
                        newdiv8.src = aiphoto
                    }
                    else {
                        newdiv8.src = json1[0].profilephoto
                    }
                    newdiv7.appendChild(newdiv8)
                    newdiv5.className = "lastmsg" + element.WhoisTheFriend.slice(0,element.WhoisTheFriend.indexOf('@')) + " lastmsg"
                    let response = await fetch("http://localhost:5000/api/messages/lastTyped",{
                        method : "POST",
                        headers : {
                            "Content-Type" : "application/json"
                        },
                        body : JSON.stringify({sender : localStorage.getItem("email") , receiver : element.WhoisTheFriend})
                    })
                    let json = await response.json()
                    if(json.success === false) {
                        newdiv5.innerHTML = "No chats has been Started"
                        newdiv5.id="lastyped" + element.WhoisTheFriend.slice(0,element.WhoisTheFriend.indexOf('@')) + (index+1)
                    }
                    else {
                        if(json.lasttyped.length >= 26) {
                            newdiv5.innerHTML = json.lasttyped.slice(0,26) + ".."
                        }
                        else {
                            newdiv5.innerHTML = json.lasttyped
                        }
                        newdiv5.id="lastyped" + element.WhoisTheFriend.slice(0,element.WhoisTheFriend.indexOf('@')) + (index+1)
                    }
                    newdiv4.className = "personEmail"
                    newdiv4.id = "personEmail" + (index+1)
                    newdiv4.innerHTML = element.WhoisTheFriend
                    newdiv1.className = "personTochat"
                    newdiv1.id = "person" + (index+1)
                    newdiv2.className = "textdiv"
                    newdiv2.id = "textdiv" + (index+1)
                    newdiv3.className = "imgdiv"
                    newdiv3.id = "imgdiv" + (index+1)
                    newdiv1.onclick = handleOnClickOnAPersonDiv
                    newdiv3.appendChild(newdiv6)
                    newdiv3.appendChild(newdiv7)
                    newdiv2.appendChild(newdiv4)
                    newdiv2.appendChild(newdiv5)
                    newdiv1.appendChild(newdiv2)
                    newdiv1.appendChild(newdiv3)
                    frdsList.appendChild(newdiv1)
                    
                }
            }
        }
        fetchingAllFriends()
    },[])
    useEffect(()=>{
        const fetchallmsgs = async () => {
            let response = await fetch("http://localhost:5000/api/messages/fetchallmsgsforauser",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({receiver : localStorage.getItem("email")})
            })
            let json = await response.json()
            settotalreceviedmsgs(json)
        }
        fetchallmsgs()
    },[totalreceviedmsgs.length])
    const handleClickOnAiDiv = () => {
        setchatting(true)
        localStorage.setItem("chattingwith","ChatAi@GPT")
        setchattingwith("ChatAi@GPT")
        setjustHasCameOnTheChatPage((justHasCameOnTheChatPage)=>{
            if(justHasCameOnTheChatPage){
                return false
            }
            else {
                document.querySelector(".chats").innerHTML = ""
            }
        })
    }

    const handleClickonAiSection = async () => {
        if(chataiAlreadyfrd){
        }
        else{
            if(frds.length === 0) {
                document.querySelector(".frdsList").innerHTML = ""
            }
            let response = await fetch("http://localhost:5000/api/friends/createTwoFriends",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({KiskaFriend : localStorage.getItem("email") , WhoisTheFriend : "ChatAi@GPT"})
            })
            const frdsList = document.querySelector(".frdsList")
                    const newdiv1 = document.createElement("div")
                    const newdiv2 = document.createElement("div")
                    const newdiv3 = document.createElement("div")
                    const newdiv4 = document.createElement("div")
                    const newdiv5 = document.createElement("div")
                    const newdiv6 = document.createElement("div")
                    const newdiv7 = document.createElement('div')
                    const newdiv8 = document.createElement("img")
                    newdiv6.className = "onlinedot"
                    newdiv6.id = "dotidgpt"
                    newdiv7.className = "profilephoto"
                    newdiv7.id = "profilephtogpt"
                    newdiv8.src = aiphoto
                    newdiv7.appendChild(newdiv8)
                    newdiv3.appendChild(newdiv6)
                    newdiv3.appendChild(newdiv7)
                    newdiv5.className = "lastmsg" + "ChatAi" + " lastmsg"
                    newdiv5.innerHTML = "No Chats Has Been Started"
                    newdiv4.className = "personEmail"
                    newdiv4.innerHTML = "ChatAi@GPT"
                    newdiv2.className = "textdiv"
                    newdiv3.className = "imgdiv"
                    newdiv2.appendChild(newdiv4)
                    newdiv2.appendChild(newdiv5)
                    newdiv1.appendChild(newdiv2)
                    newdiv1.appendChild(newdiv3)
                    newdiv1.className = "personTochat"
                    newdiv1.id = "person" + "chatAi"
                    newdiv1.onclick = handleClickOnAiDiv
                    frdsList.appendChild(newdiv1)
                    setchataiAlreadyfrd(true)
        }
    }
    const handlechangeOnSearch = (event) => {
        const allfrdsemail = document.querySelectorAll(".personEmail")
        const alllasttyped = document.querySelectorAll(".lastmsg")
        for(let index1 = 0; index1 <allfrdsemail.length ; index1++){
            const email = allfrdsemail[index1].innerHTML;
            const lastmsg = alllasttyped[index1].innerHTML;
            const isVisible = email.includes(event.target.value) || lastmsg.includes(event.target.value)
            document.getElementById("person"+(index1+1)).classList.toggle("hide",!isVisible)
        }
    }
        // socket.on("OnlineIds",ids=>{
        //     console.log(ids);
        //     socket.off("OnlineIds")
        // })
        socket.on("OnlineIds",ids=>{
            console.log(ids);
            return () => {
                socket.off("OnlineIds")
            }
        })
  return (
    <div className='chatwith'>
        <div className="features">
            <div className="item" id='item1' title='Nvaigate to Chat'><i className="fa-solid fa-comment"></i></div>
            <div className="item" id='item2' title='Navigate to Status'><i className="fa-solid fa-network-wired"></i></div>
            <div className="item" id='item3' title='Navigate to Chatgram Ai' onClick={handleClickonAiSection}><i className="fa-brands fa-airbnb"></i></div>
            <div className="item" id='item4' title='Navigate to Profile'><i className="fa-solid fa-user"></i></div>
        </div>
        <div className="secondDiv">
            <div className="searchbar">
                <input type="text" className='searchinput'  placeholder="Search..." id="search-input" onChange={handlechangeOnSearch} disabled={frds.length === 0 ? true : false}/></div>
            <div className="frdsList">
            </div>
        </div>
    </div>
  )
}

export default ChatWith