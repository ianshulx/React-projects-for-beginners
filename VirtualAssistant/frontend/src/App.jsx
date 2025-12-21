import './App.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import PasswordReset from './pages/passwordReset'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from './Context/usercontext' // ✅ import context, not provider
import Customize from './pages/Customize'
import React from 'react'
import Home from './pages/Home.jsx'
import Customize2 from './pages/Customize2'

function App() {
  const { users, setUsers } = useContext(UserContext); // ✅ use UserContext
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed z-50 w-10 h-10 rounded-full border-2 border-cyan-300 shadow-[0_0_20px_rgba(0,255,255,0.6)]"
        style={{
          left: cursor.x - 20,
          top: cursor.y - 20,
        }}
      ></div>

      <Routes>
        <Route path="/" element={(users?.assistantName && users?.assistantImage) ? <Home /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={!users ? <Login /> : <Home />} />
        <Route path="/passwordreset" element={<PasswordReset />} />
        <Route path="/customize" element={users ? <Customize /> : <Login />} />
        <Route path="/customize2" element={users ? <Customize2 /> : <Login />} />
      </Routes>
    </>
  )
}

export default App
