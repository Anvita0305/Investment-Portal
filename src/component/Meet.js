import React from "react";
import ReactDOM from "react-dom";


const Meet = () => {
    const handleclickmeet=()=>{
        const buttonchat = document.getElementById("meet");
      
        // Add a click event listener to the button
          buttonchat.addEventListener("click", function() {
          // Navigate to the desired page
          window.location.href = "https://sayali492.github.io/Zoom-API/";
        })
     }
    return (
        <div>
            <h3 style={{textAlign:"left"}}>Meeting credentials:</h3>
            <h3 style={{textAlign:"left"}}>Meeting ID : 6606182283</h3>
            <h3 style={{textAlign:"left"}}>Meeting Password : c3ZoY1ZoVTloOUk2ajV5bEtZUWVhZz09</h3>
            <button class="btn btn-primary" id="meet" style={{marginleft:"20px"}} onClick={handleclickmeet}>Join Meeting</button>
            

        </div>
    )
}

export default Meet;