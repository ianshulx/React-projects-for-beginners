import React from 'react'
import "../stylesheets/Chat.css"
import ChatWith from './ChatWith'
import PersonalChat from './PersonalChat'
import ChattingState from '../context/ChattingState'
const Chat = (props) =>  {
  return (
    <>
    <div className="chatcontainer">
    <ChattingState>
      <ChatWith></ChatWith>
      <PersonalChat></PersonalChat>
    </ChattingState>
    </div>
    </>
  )
}

export default Chat