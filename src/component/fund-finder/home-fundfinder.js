import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Modal,
  Slider,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Checkbox,
} from "@material-ui/core";
import { common } from "@material-ui/core/colors";

const HomeFundFinder = () => {
  const [investors, setInvestors] = useState([]);
  const [email, setEmail] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:4444/pitchIdea")
      .then(function (response) {
        console.log("response");
        setInvestors(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
      });
  }, []);
  return (
    <div>
      {/* <h1>Home Fund Finder</h1> */}
      <label>Enter your Email ID to know about your pitches!</label>
      <br></br>
        <input type="text" placeholder="Email" style={{height:"3rem",width:"25rem"}} onChange={(e)=>setEmail(e.target.value)}/>
        <br></br><br></br>
      <div style={{background:"white"}}>
        {investors.map((investor) => {
          if (investor.email === email) {
            return (
              <div className="container">
                <h5 style={{textAlign:"center"}}>Name: {investor.name}</h5>
                <h5 style={{textAlign:"center"}}>Email: {investor.email}</h5>
                <h5 style={{textAlign:"center"}}>Description: {investor.desc}</h5>
                <h5 style={{textAlign:"center"}}>Target: {investor.target}</h5>
                <h5 style={{textAlign:"center"}}>Amount: {investor.amount}</h5>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <br></br><br></br>
    </div>
  );
};
export default HomeFundFinder;
