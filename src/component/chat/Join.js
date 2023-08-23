
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import "./chat.css"

const socket = io.connect("http://localhost:3001");

function Join() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [roomID, setRoomID] = useState(generateRoomID());

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  function generateRoomID() {
    return Math.floor(Math.random() * 100000);
  }

  function handleNewRoom() {
    setRoomID(generateRoomID());
  }

  return (
    <div className="App" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      {!showChat ? (
        <div className="joinChatContainer">
          <h3 style={{color:"black"}}>Join A Chat</h3>
          <h4>Your Meeting ID is:</h4>
          <h4 id="roomID">
           {roomID}
          </h4>
          <button onClick={handleNewRoom}>Generate New Room</button>
          <input
            type="text"
            placeholder="Your Name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default Join;
