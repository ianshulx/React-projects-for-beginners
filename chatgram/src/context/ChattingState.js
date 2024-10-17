import React from 'react'
import Chattingornot from './ChattingornotContext'
import { useState } from 'react'
function ChattingState(props) {
    const [chatting, setchatting] = useState(false)
    const [chattingwith, setchattingwith] = useState("")
    const [justHasCameOnTheChatPage, setjustHasCameOnTheChatPage] = useState(true)
    const [chattingWithIndex, setchattingWithIndex] = useState(0)
    const [typing_, settyping_] = useState([])
    const [totalreceviedmsgs, settotalreceviedmsgs] = useState([])
    function convertUTCToIST(utcDateString) {
      const utcDate = new Date(utcDateString);
      const utcTime = utcDate.getTime();
      const istOffset = 5.5 * 60 * 60 * 1000;
      const istTime = utcTime + istOffset;
      const istDate = new Date(istTime);
      let hours = istDate.getUTCHours();
      const minutes = istDate.getUTCMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; 
      const strHours = hours.toString().padStart(2, '0');
      const strMinutes = minutes.toString().padStart(2, '0');
      return `${strHours}:${strMinutes} ${ampm}`;
  }
  return (
    <Chattingornot.Provider value={{chatting,setchatting,chattingwith,setchattingwith,justHasCameOnTheChatPage,setjustHasCameOnTheChatPage,chattingWithIndex, setchattingWithIndex,typing_, settyping_,totalreceviedmsgs, settotalreceviedmsgs,convertUTCToIST}}>
        {props.children}
    </Chattingornot.Provider>
  )
}

export default ChattingState