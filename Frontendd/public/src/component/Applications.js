import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Applications.css";
import { colors } from "@material-ui/core";

const Applications = (props) => {
  const [data, setData] = useState([]);

  const fetchData = (e) => {
    axios
      .get("http://localhost:4444/pitchIdea")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        // console.log("err");
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

 const handleclickchat=()=>{
  const buttonchat = document.getElementById("chat");

  // Add a click event listener to the button
    buttonchat.addEventListener("click", function() {
    // Navigate to the desired page
    window.location.href = "/join-chat";
  })}

  const handleclickmeet=()=>{
    const buttonchat = document.getElementById("meet");
  
    // Add a click event listener to the button
      buttonchat.addEventListener("click", function() {
      // Navigate to the desired page
      window.location.href = "/meet";
    })
 }
 const handleclickrecommend=()=>{
  const buttonchat = document.getElementById("more");

  // Add a click event listener to the button
    buttonchat.addEventListener("click", function() {
    // Navigate to the desired page
    window.location.href = "/RecommendPitches";
  })
}
  return (
    <>
      {/* <h1>Requested Pitches</h1> */}
      <div>
      <br></br><br></br>
        {data.map((item) => (
          <>
            <article class="job-card">
              <h3 class="job-title">Name: {item.name}</h3>
              <h5 class="company-name">Email: {item.email}</h5>
              <div class="skills-container">
                <div class="skill">Description: {item.desc}</div>
                <div class="skill">Target:{item.target}</div>
                <div class="skill">Amount:{item.amount}</div>
              </div>
             
              <button class="bg-info" id="meet"  onClick={handleclickmeet}><a href="/meet">Join Meeting </a></button>
              
              <button class="bg-info"
                onClick={() => {
                  const subject = "Pitch approval Status";
                  const body = `I'm interested in ${item.name}. For further discussions, you can join my meet.Meeting credentials:
            Meeting ID : 6606182283
            Meeting Password : c3ZoY1ZoVTloOUk2ajV5bEtZUWVhZz09`

                  // const mailtoLink = `mailto:${
                  //   item.email
                  // }?subject=${encodeURIComponent(
                  //   subject
                  // )}&body=${encodeURIComponent(body)}`;
                  const allLinks = document.querySelectorAll("a");
                  allLinks.forEach((link) => {
                    link.setAttribute(
                      "href",
                      `mailto:${item.email}?subject=${encodeURIComponent(
                        subject
                      )}&body=${encodeURIComponent(body)}`
                    );
                  });
                }}
                // style={{ bgcolor:"green" }}
              >
                <a>I'm Interested</a>
              </button>
              <button id="chat" class="bg-info" onClick={handleclickchat}><a href='/join-chat'>Chat  </a></button>
              <button id="more" class="bg-info" onClick={handleclickrecommend}><a href="/RecommendPitches">Show me more pitches</a></button>
              &nbsp;&nbsp;&nbsp;&nbsp;
             <br></br>
            </article>
            <br></br>
          </>
        ))}
      </div>
    </>
  );
};
export default Applications;
