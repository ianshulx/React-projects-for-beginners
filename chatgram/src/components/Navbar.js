import React from 'react'
import "../stylesheets/Navbar.css"
import { Link,useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import SocketContext from '../context/SocketContext'
import { Socket } from 'socket.io-client'
function Navbar() {
    const context = useContext(SocketContext)
    const {socket} = context
    const navigate = useNavigate()
    if(localStorage.getItem("authToken")){
        const fetchUser = async (event) => {
            let response = await fetch("http://localhost:5000/api/authentication/getuser",{
                method:  "POST",
                headers : {
                    "Content-Type" : "application/json",
                    "authToken" : localStorage.getItem("authToken")
                }
            })
            const json  = await response.json()
            document.querySelector("#username").innerHTML = json.name
        }
        fetchUser()
    }
    const handlelogout = () => {
        localStorage.clear()
        socket.emit("logoutuser",socket.id)
        navigate('/login')
    }
  return (
    <div className="navbar">
        {
            localStorage.getItem("authToken") ? 
            <ul>
            <Link id="itme1" to="/userdata"><button className='btn' id="username" title='Navigate to Your Profile'>Your name</button></Link>
            <Link id="itme2" to="/chatpage"><button className='btn' title='Navigate to Chat Section'>Chats</button></Link>
            <Link id="itme2" to="/addfriends"><button className='btn' title='Navigate to Add Freinds'>Add</button></Link>
            <Link id="itme3" to="/notifications"><button className='btn' title='Navigate to Notifications'>Notifications</button></Link>
            <Link id="itme4" to="/login"><button className='btn' onClick={handlelogout} title='Navigate to Login Page'>Log Out</button></Link>
            </ul> : 
            <ul>
            <Link id="itme1" to="/signup"><button className='btn'>Sign Up</button></Link>
            <Link id="itme2" to="/login"><button className='btn'>Log In</button></Link>
            </ul>
        }
    </div>
  )
}

export default Navbar