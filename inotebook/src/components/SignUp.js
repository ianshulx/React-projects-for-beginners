import React from 'react'
import { useState } from 'react'
import {useNavigate} from "react-router-dom"

function SignUp(props) {
  const navigate = useNavigate()
  const [confirmpasswordtext, setconfirmpasswordtext] = useState("")
  const [userdata, setuserdata] = useState({name:"",email:"",password : ""})
  const handleSignUp = async (event) => {
    event.preventDefault()
    let response = await fetch("http://localhost:7000/api/auth/createuser",{
      method:"POST",
      headers : {
        "Content-Type":"application/json",
      },
      body : JSON.stringify({name : userdata.name,email : userdata.email,password:userdata.password})
    })
    const json = await response.json()
    if(json.success) {
      let response1 = await fetch("http://localhost:7000/api/userStats/createStats",{
        method:"POST",
        headers : {
          "Content-Type":"application/json",
        },
        body : JSON.stringify({email : userdata.email})
      })
      const json1 = await response1.json()
      navigate("/")
      props.showAlert("SignUp successfully","success")
      localStorage.setItem("authToken",json["authToken"])
      localStorage.setItem("email",userdata.email)
    }
    else {
      if (json.error === "Sorry a user with this email address already exists"){
        props.showAlert("Sorry a user with this email address already exists","info")
      }
    }
  }
  const handleonChange = (event) => {
    setuserdata({...userdata,[event.target.name]:event.target.value})
  }
  const handleconfirmpwdtext = (event) => {
    if (event.target.value === userdata.password) {
      setconfirmpasswordtext("")
    }
    else {
      setconfirmpasswordtext("Confirm password note matched")
    }
  }
  return (
    <>
    <div className="container">
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">UserName</label>
        <input type="text" className="form-control" id="name" name='name' style={{width:"300px"}}  onChange={handleonChange} value={userdata.name} minLength={5}/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" name='email' placeholder="name@example.com" style={{width:"300px"}}  onChange={handleonChange} value={userdata.email} minLength={5}/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" name='password' style={{width:"300px"}}  onChange={handleonChange} value={userdata.password} minLength={8}/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="confirmpassword" name='confirmpassword' style={{width:"300px"}}  onChange={handleconfirmpwdtext}  minLength={8}/>
      </div>
      <button type="button" className="btn btn-primary my-2" onClick={handleSignUp} disabled={confirmpasswordtext===""?false:true}>Sign Up</button>
      <div className='my-4' style={{fontSize:"20px"}}>
        {confirmpasswordtext}
      </div>
    </div>
    </>
  )
}

export default SignUp