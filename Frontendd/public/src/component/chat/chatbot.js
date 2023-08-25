import React from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
    let navigate = useNavigate();
    return (
        <>
        <h1 style={{color:"white"}}>Chatbot</h1>
        {/* <button type="button" class="btn btn-secondary" onClick={() => {navigate("/Homepage")}}>Back</button> */}
        <br></br>
        <br></br>
        <br></br>
        <div>
        <br></br>
        <iframe width="350" height="430" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/284244a6-f0d7-4f12-abd3-7388881cd951"></iframe>
        </div>
        </>
    )
    }

export default Chat;

    