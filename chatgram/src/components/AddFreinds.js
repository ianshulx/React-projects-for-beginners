import React, { useEffect } from 'react'
import ChatContext from '../context/ChatContext'
import { useContext } from 'react'
import Loading from "./Loading";
import { useRef } from 'react';
import "../stylesheets/Addfriends.css"
function AddFreinds() {
    const context = useContext(ChatContext)
    const refforrender = useRef();
    console.log(refforrender);
    const {fetchalluser,fnFor_id,addFreindReq} = context
    const addfreind = async (event) => {
      const jsonuser = await fnFor_id(event.target.id)
      let successforaddFriend = await addFreindReq(jsonuser.email)
      if(successforaddFriend) {
        const freindsContainer = document.querySelector(".freindsContainer")
        console.log(event.target.id);
        freindsContainer.removeChild(document.getElementById(`${event.target.id}`))
        refforrender.current.click();
      }
    }
    const fetch = async () => { 
      const userjson = await fetchalluser()
      let indexOfUser = 0 
      for (; indexOfUser < userjson.length;) {
        const element = userjson[indexOfUser];
        if ( element.email === localStorage.getItem("email")) {
          break
        }
        else {
          indexOfUser++;
        }
      }
      [userjson[indexOfUser] , userjson[userjson.length -1]] = [userjson[userjson.length-1],userjson[indexOfUser]]
      const freindsContainer = document.querySelector(".freindsContainer")
      for (let index = 0; index < userjson.length; index++) {
        const element = userjson[index];
        const newdiv1 = document.createElement("div")
        newdiv1.className = "person"
        const newdiv2 = document.createElement("div")
        newdiv2.className = "serialNum"
        const newdiv3 = document.createElement("div")
        newdiv3.className = "personname"
        const newdiv4 = document.createElement("div")
        newdiv4.className = "personemail"
        const btn_ = document.createElement('button')
        btn_.className = "addbtn"
        btn_.id = element._id
        btn_.innerHTML = "Addfriend"
        btn_.onclick = addfreind
        newdiv1.id = element._id
        newdiv2.innerHTML = index+1
        newdiv3.innerHTML = element.name
        newdiv4.innerHTML = element.email
        newdiv1.appendChild(newdiv2)
        newdiv1.appendChild(newdiv3)
        newdiv1.appendChild(newdiv4)
        newdiv1.appendChild(btn_)
        if (newdiv4.innerHTML !== localStorage.getItem("email")) {
          console.log(index+1)
          console.log("occured")
          freindsContainer.appendChild(newdiv1)
        }
        else{}
      }
    }
    useEffect(()=>{
      fetch()
    },[])
    const renderthePage = () => {
      document.querySelector(".freindsContainer").innerHTML = "";
      fetch();
    }
  return (
    <>
    <div className="freindsContainer">
    <button style={{display:"none"}} ref={refforrender} onClick={renderthePage}>iubg </button>
    </div>
    </>
  )
}

export default AddFreinds