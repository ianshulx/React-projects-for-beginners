import React from 'react'
import { useState } from 'react'
import {useNavigate} from "react-router-dom"
function Login(props) {
  let navigate = useNavigate()
  const [creditianls, setcreditianls] = useState({email:"",password:""})
  const handleLogin = async (event) => {
    event.preventDefault()
    let response = await fetch("http://localhost:7000/api/auth/login",{
      method : "POST",
      headers : {
        "Content-Type":"application/json",
      },
      body : JSON.stringify({email:creditianls.email,password:creditianls.password})
    })
    const json = await response.json()
    if (json.success) {
      props.showAlert("log in Successfull","success")
      navigate("/")
      localStorage.setItem("authToken",json["authToken"])
      localStorage.setItem("email",creditianls.email)
    }
    else {
        props.showAlert("Wrong Attemption","warning")
    }
  }

  const handleonChange = (event) => {
    setcreditianls({...creditianls,[event.target.name]:event.target.value})
  }
  return (
    <>
    <div className="container">
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" name='email' placeholder="name@example.com" style={{width:"300px"}} value={creditianls.email} onChange={handleonChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" name='password' style={{width:"300px"}} value={creditianls.password} onChange={handleonChange}/>
      </div>
      <button type="button" className="btn btn-primary" onClick={handleLogin}>Log In</button>
    </div>
    </>
  )
}

export default Login