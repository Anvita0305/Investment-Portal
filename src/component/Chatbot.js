import React, { useState } from 'react';
import { FaComment } from 'react-icons/fa';
import '../index.css';

function ChatButton() {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot=()=>{
    alert("hello");
    setShowChatbot(!showChatbot);
  }

  return (
    <div className="chat-button-container">
      <button onClick={()=>{setShowChatbot(!showChatbot);}} className='btn btn-primary' style={{height:"3rem",width:"3rem",marginLeft:"40rem"}}> <FaComment /></button>
      <div className={showChatbot ? "chatbot-panel-open" : "chatbot-panel-close"} onClick={toggleChatbot}>
      <iframe width="390" height="490" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/284244a6-f0d7-4f12-abd3-7388881cd951"></iframe>
      </div>
     
    </div>
  );
}

export default ChatButton;
