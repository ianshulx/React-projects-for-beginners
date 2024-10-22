import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation,useNavigate } from 'react-router-dom'

function Navbar() {
  if (localStorage.getItem("authToken")) {
    const fetchuserfdata = async () => {
      let response = await fetch("http://localhost:7000/api/auth/getuser",{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          "authToken" : localStorage.getItem("authToken")
        }
      })
      const json = await response.json()
      document.querySelector("#nameofuser").innerHTML = json.name
    }
    fetchuserfdata()
  }
  const navigate = useNavigate()
  let location = useLocation()
  const handlelogout = () => {
    localStorage.clear()
    navigate("/login")
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">iNotebook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active":""}`} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active":""}`} to="/about">About</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/dashBoard" ? "active":""}`} to="/dashBoard">DashBoard</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/notesSection" ? "active":""}`} to="/notesSection">Notes</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/recyclebin" ? "active":""}`} to="/recyclebin">Recycle Bin</Link>
                </li>
            </ul>
            {
              localStorage.getItem("authToken") ? 
              <form className="d-flex" >
              <button className="btn btn-primary mx-2" id="nameofuser">Your name</button> 
              <button className="btn btn-primary" onClick={handlelogout}>Log Out</button> 
              </form>: <form className="d-flex" >
              <Link className="btn btn-primary" to="/signup">Sign Up</Link>
              <Link className="btn btn-primary mx-4" to="/login">Login</Link>
              </form>
            }
            </div>
        </div>
        </nav>
    </div>
  )
}

export default Navbar