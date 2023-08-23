import React, { useState } from 'react';
import { FaComment } from 'react-icons/fa';
import axios from 'axios';

function Form(){
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [target, setTarget] = useState("");
    const [email, setEmail] = useState("");
    const[amount, setAmount] = useState("");
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(name, desc, target, email, amount);
        axios.post('http://localhost:4444/pitchIdea', {
          name,
          desc,
          target,
          email,
          amount
        }).then(res => {
          console.log(res.data);
          alert('You have submitted the form.');
        }).catch(err => {
          console.log(err);
          alert('There was an error submitting the form.');
        });
      }

    return(
    <div className="wrapper" style={{padding:"5rem",backgroundColor:"rgba(255,255,255,0.5)",paddingLeft:"4rem",height:"42rem"}}>
      <h1 >Pitch your Idea</h1>
      <br></br>
      <form>
        <fieldset>
          <label>
            <p><strong>StartUp/Business Name</strong></p>
            <input value={name} style={{width:"25rem",borderRadius:"8px",height:"2.5rem"}} onChange={(e)=>{setName(e.target.value)}}/>
          </label>
          <br></br>
          <label>
            <p><strong>Description</strong></p>
            <textarea type="textarea" value={desc} style={{width:"25rem",height:"5rem",borderRadius:"8px"}} onChange={(e)=>{setDesc(e.target.value)}}/>
          </label>
          <br></br>
          <label>
            <p><strong>Target Market:</strong></p>
            <input value={target}  style={{width:"25rem",borderRadius:"8px",height:"2.5rem"}} onChange={(e)=>{setTarget(e.target.value)}}/>
          </label>
          <br></br>
          <label>
            <p><strong>Amount</strong></p>
            <input value={amount}  style={{width:"25rem",borderRadius:"8px",height:"2.5rem"}} onChange={(e)=>{setAmount(e.target.value)}}/>
          </label>
          <br></br>
          <label>
          
            <p><strong>Email</strong></p>,
            <input type="email" value={email}  style={{width:"25rem",borderRadius:"8px",height:"2.5rem"}} onChange={(e)=>{setEmail(e.target.value)}}/>
          </label>
          <br></br>
        </fieldset>
        <br></br>
        <div  style={{marginBottom:"20px",marginLeft:"29%",display:"flex",flexDirection:"row",marginBottom:"20px"}}>
        <button className='btn btn-primary' style={{marginBottom:"20px",borderRadius:"8px",height:"2.5rem"}} type="submit" onClick={handleSubmit}>Submit</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className='btn btn-primary' style={{marginBottom:"20px",borderRadius:"8px",height:"2.5rem"}} type="reset">Reset</button>
        <br></br>
        </div>
        <br></br>
        
      </form>
    </div>
    );
};

export default Form;