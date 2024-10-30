import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import "../stylesheets/SignUp.css"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import SocketContext from '../context/SocketContext'
function SignUp() {
  const navigate = useNavigate()
  const [userdata, setuserdata] = useState({name: "",email : "",password : "" , image : ""})
  const [confirmpassword, setconfirmpassword] = useState(false)
  const context = useContext(SocketContext)
  const {socket} = context
  const handleSignUp = async (event) => {
    console.log("yes");
    console.log(userdata.image);
    event.preventDefault()
    let response = await fetch("http://localhost:5000/api/authentication/createuser",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({name : userdata.name , email : userdata.email , password : userdata.password , profilephoto : userdata.image })
    })
    const json  = await response.json()
    console.log(json)
    if(json.success) {
      localStorage.setItem("authToken",json.authToken)
      localStorage.setItem("email",userdata.email)
      let response1 = await fetch("http://localhost:5000/api/authentication/fetchuserbyemail",{
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({email : userdata.email})
      })
      let json1 = await response1.json()
      let _id = json1[0]._id
      socket.emit("newuserConnected",_id)
      navigate("/chatpage")
    }
    else {
      window.alert(json.error)
    }
  }
  const handleonchange = (event) => {
    setuserdata({...userdata,[event.target.name]:event.target.value})
  }
  const handlechangeonConfirmPassword = (event) => {
    if(userdata.password === event.target.value) {
      console.log("matched");
      setconfirmpassword(true)
    }
    else{
      setconfirmpassword(false)
    }
  }
  useEffect(()=>{
    if(userdata.password === document.getElementById("confirmpassword").value){
      setconfirmpassword(true)
    }
    else {
      setconfirmpassword(false)
    }
  },[userdata.password])
  const convertbase64 = (event) => {
    var filereader  = new FileReader()
    filereader.readAsDataURL(event.target.files[0])
    filereader.onload = () => {
      console.log(filereader.result)
      setuserdata((user)=>({
        ...user,
        image : filereader.result
      }))
    }
    filereader.onerror = error => {
      console.log(error)
    }
  }
  return (
    <>
    <div className="container">
    <form action="" className='form'>
        <label htmlFor="email">Name</label>
        <input type="text" id='name' name='name' value={userdata.name} onChange={handleonchange}/>
        <br/>
        <label htmlFor="email">Email</label>
        <input type="text" id='email' name='email' value={userdata.email} onChange={handleonchange}/>
        <br/>
        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="password" value={userdata.password} onChange={handleonchange}/>
        <br />
        <label htmlFor="confirmpassword">Confirm Password</label>
        <input type="text" id="confirmpassword" name="confirmpassword"onChange={handlechangeonConfirmPassword}/>
        <br />
        <input type="file" accept='image/' onChange={convertbase64} id='fileinput'/>
        {/* {image ==="" || image === null ? "" : <img src={image} style={{width:"100px"}}></img>} */}
        <div className="confirmtext">{!confirmpassword && <div>Confirm text Not Matched</div> }</div>
        <button id='signinbutton' className="signupbtn" onClick={handleSignUp} disabled = {!confirmpassword}>Sign Up</button>
        <Link className="alreadyhaveacc" to="/login"style={{textDecoration:"none",marginLeft:"10px",marginTop:"10px"}}>Do You Have Alreay An Accout? Log IN</Link>
    </form>
    <div className="imagelogo"></div>
    </div>
    </>
  )
}

export default SignUp