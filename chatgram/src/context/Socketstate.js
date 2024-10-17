import React from "react";
import SocketContext from "./SocketContext";
import { io } from "socket.io-client";
import { useEffect , useState} from "react";
const socket = io('http://localhost:5000')
function Socketstate(props) {
    useEffect(()=>{
        socket.on(('connect'),()=>{
          console.log("connected to server")
        })
      },[])
  return (
    <SocketContext.Provider value={{socket}}>
        {props.children}
    </SocketContext.Provider>
  )
}

export default Socketstate