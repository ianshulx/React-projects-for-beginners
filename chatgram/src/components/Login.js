import React from 'react'
import "../stylesheets/Login.css"
import { useState} from 'react'
import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import SocketContext from '../context/SocketContext'
function Login() {
    const navigate = useNavigate();
    const [creditianls, setcreditianls] = useState({email:"",password:""})
    const context = useContext(SocketContext)
    const {socket} = context
    const handleLogin = async (event)=> {
        event.preventDefault() 
        let response = await fetch("http://localhost:5000/api/authentication/loginuser",{
            method :"POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({email:creditianls.email,password:creditianls.password})
        })
        const json = await response.json()
        if (json.success) {
            localStorage.setItem("authToken",json.authToken)
            localStorage.setItem("email",creditianls.email)
            let response1 = await fetch("http://localhost:5000/api/authentication/fetchuserbyemail",{
                method : "POST",
                headers : {
                  "Content-Type" : "application/json"
                },
                body : JSON.stringify({email : creditianls.email})
              })
              let json1 = await response1.json()
              let _id = json1[0]._id
              socket.emit("newuserConnected",_id)
            navigate("/chatpage")
        }
        else {
            window.alert("Please Login with correct Creaditianls")
        }
    }
    const handleonchange = (event) => {
        setcreditianls({...creditianls,[event.target.name]:event.target.value})
    }
  return (
    <>
    <div className="container">
    <form action="" className='loginform'>
        <label htmlFor="email">Email</label>
        <input type="text" id='email' name='email'value={creditianls.email} onChange={handleonchange}/>
        <br/>
        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="password" value={creditianls.password} onChange={handleonchange}/>
        <br />
        <button id='loginbutton' className='loginbutton' onClick={handleLogin}>Log In</button>
        <Link className="alreadyhaveacc" to="/signup"style={{textDecoration:"none",marginLeft:"10px",marginTop:"10px"}}>Do Not Have An Accout?Sign IUp</Link>
    </form>
    <div className="imagelogo"></div>
    </div>
    </>
  )
}

export default Login