import { json } from "react-router-dom";
import ChatContext from "./ChatContext";
import React from 'react'
import { useState } from "react";

function FetchAllUserState(props) {
  const [loading, setloading] = useState(false)
  // fetching all user
    const fetchalluser = async (req,res) => {
      let response = await fetch("http://localhost:5000/api/fetchdatabase/users") 
      let userjson = await response.json()
      let response1 = await fetch("http://localhost:5000/api/notifications/allFromUserRequestForaUser",{
        method :"POST" ,
        headers : {
          "Content-Type" : "application/json" 
        },
        body : JSON.stringify({fromEmail: localStorage.getItem('email')})
      })
      let json1 = await response1.json()
      let response2 = await fetch("http://localhost:5000/api/friends/allFriendsForAUser",{
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({KiskeFriends : localStorage.getItem("email")})
      })
      let json2 = await response2.json()
      for (let index1 = 0; index1 < json1.length; index1++) {
        const toEmail = json1[index1].toEmail;
        for (let index2 = 0; index2 < userjson.length; index2++) {
          const email =userjson[index2].email;
          if (toEmail === email) {
            userjson.splice(index2,1)
          }
        }
      }
      for (let index1 = 0; index1 < json2.length; index1++) {
        const whoisthefrined = json2[index1].WhoisTheFriend;
        for (let index2 = 0; index2< userjson.length; index2++) {
          const email = userjson[index2].email;
          if (whoisthefrined === email) {
            userjson.splice(index2,1)
          }
        }
      }
      return userjson
    }

    // finding a user by mongoId

    const fnFor_id = async (_id) => {
      const id_ = _id
      const fetchUserByMongoId = async (req,res,_id = id_) => {
        let response = await fetch("http://localhost:5000/api/authentication/fetchuserbyid",{
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({_id : _id})
        })
        let json = await response.json()
        return json.user
      }
      const jsonuser = await fetchUserByMongoId()
      return jsonuser
    }

    // 
    const addFreindReq = async (toEmail) => {
      let response = await fetch("http://localhost:5000/api/notifications/addfriend",{
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({fromEmail : localStorage.getItem("email"), toEmail : toEmail })
      })
      let json = await response.json()
      return json.successforAddfriend
    }
  return (
    <ChatContext.Provider value={{fetchalluser,fnFor_id,addFreindReq,loading,setloading}}>
        {props.children}
    </ChatContext.Provider>
  )
}

export default FetchAllUserState