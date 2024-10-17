import React from 'react'
import "../stylesheets/Notificationforuser.css"
import { useState } from 'react'
function Notificaionforauser() {
  const [totalnotifications, settotalnotifications] = useState(0)
  const handleaccpet = async (event) => {
    let response = await fetch("http://localhost:5000/api/friends/createTwoFriends",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({KiskaFriend:localStorage.getItem("email"),WhoisTheFriend : document.getElementById("mailId" + event.target.id).innerHTML})
    })
    let json = await response.json()
    let response1 = await fetch("http://localhost:5000/api/notifications/deleteTheReq",{
      method : "DELETE",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({fromEmail :  document.getElementById("mailId" + event.target.id).innerHTML , toEmail : localStorage.getItem("email")})
    })
    let json1 = await response1.json()
    document.querySelector(".NotificatiobList").removeChild(document.getElementById("person" + event.target.id))
  }
  const handlereject = async (event) => {
    let response = await fetch("http://localhost:5000/api/notifications/deleteTheReq",{
      method : "DELETE",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({fromEmail :  document.getElementById("mailId" + event.target.id).innerHTML , toEmail : localStorage.getItem("email")})
    })
    let json = await response.json()
    document.querySelector(".NotificatiobList").removeChild(document.getElementById("person" + event.target.id))
  }
  const fetching = async () => {
    let response = await fetch("http://localhost:5000/api/notifications/allToUserRequestsForaUser",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({toEmail:localStorage.getItem("email")})
    })
    let json = await response.json()
    if (json.length === 0) {
      settotalnotifications(0)
    }
    else {
      const friendreqList = document.querySelector(".NotificatiobList")
      friendreqList.innerHTML = ""
      for (let index = 0; index < json.length; index++) {
        const element = json[index];
        const newdiv1 = document.createElement("div")
        newdiv1.className ="personN"
        newdiv1.id = "person" + (index+1)
        const newdiv2 = document.createElement("div")
        newdiv2.className = "serialNum"
        newdiv2.innerHTML = index + 1
        const newdiv3 = document.createElement("div")
        newdiv3.className = "friendEmail"
        newdiv3.id = "mailId" + (index+1)
        newdiv3.innerHTML = element.fromEmail
        const acceptbtn = document.createElement("button")
        acceptbtn.className = "accept"
        acceptbtn.id =  index+1
        acceptbtn.innerHTML = "Accept"
        acceptbtn.onclick = handleaccpet
        const rejectbtn = document.createElement("button")
        rejectbtn.className = "reject"
        rejectbtn.innerHTML = "Reject"
        rejectbtn.id = index + 1
        rejectbtn.onclick = handlereject
        newdiv1.appendChild(newdiv2)
        newdiv1.appendChild(newdiv3)
        newdiv1.appendChild(acceptbtn)
        newdiv1.appendChild(rejectbtn)
        friendreqList.appendChild(newdiv1)
      }
    }
  }
  fetching()
  return (
    <>
    <div className="NotificatiobList">
      {totalnotifications === 0 ? 
      <div className='noreqs'>
        <div className="nonotificationsimg"></div>
        <div className="nonotificationtxt">Oops !! No Notificatons ...</div>
        <div className="getstartedtxt">Get Started ChatGram Inc.</div>
      </div> : 
      <div>freinds</div>}
    </div>
    </>
  )
}

export default Notificaionforauser