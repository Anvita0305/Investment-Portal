import {
  AppBar,Toolbar,Typography,Button,makeStyles,} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useState } from "react";

import isAuth, { userType } from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const [showChatbot, setShowChatbot] = useState(false);
  const classes = useStyles();
  let history = useHistory();

  const handleClick = (location) => {
    console.log(location);
    history.push(location);
  };


  return (
    <AppBar position="fixed" background= "transparent">
      <Toolbar style={{minHeight: "80px"}}>
        <Typography variant="h6" className={classes.title} style={{fontSize: "32px",fontWeight: "800"}}>
        
        FININVEST
        </Typography>
        <div style={{marginTop:"20px"}}>
        {isAuth() ? (
          userType() === "fund-finder" ? (
            <>
              
              <Button color="inherit" onClick={() => handleClick("/fundfinder-home")}>
              <Typography style={{fontSize:"18px"}}>Home</Typography>
              </Button>
              <Button color="inherit" onClick={() => handleClick("/news")}>
              <Typography style={{fontSize:"18px"}}>News</Typography>
              </Button>
              {/* <Button color="inherit" onClick={() => handleClick("/myjobs")}>
              <Typography style={{fontSize:"18px"}}>Posted</Typography>
              </Button> */}
              <Button color="inherit" onClick={() => handleClick("/form")}>
              <Typography style={{fontSize:"18px"}}>Pitch an Idea</Typography>
              </Button>
              <Button color="inherit" onClick={() => handleClick("/profile")}>
              <Typography style={{fontSize:"18px"}}>Profile</Typography>
              </Button>
              <Button color="inherit" onClick={() => handleClick("/join-chat")}>
              <Typography style={{fontSize:"18px"}}>Chat</Typography>
              </Button>
              <Button color="inherit" onClick={() => handleClick("/meet")}>
              <Typography style={{fontSize:"18px"}}>Meet</Typography>
              </Button>
              <Button color="inherit" onClick={() => handleClick("/logout")}>
              <Typography style={{fontSize:"18px"}}>Logout</Typography>
              </Button>
              <Button color="inherit" onClick={() => handleClick("/home")}>
              <Typography style={{fontSize:"18px"}}>Fund-finder</Typography>
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => handleClick("/home")}>
              <Typography style={{fontSize:"18px"}}>Home</Typography>
              </Button>
              <Button color="inherit" onClick={() => handleClick("/news")}>
              <Typography style={{fontSize:"18px"}}>News</Typography>
              </Button>
              <Button
                color="inherit"
                onClick={() => handleClick("/applications")}
              >
                <Typography style={{fontSize:"18px"}}>All Pitches</Typography>
              </Button>
              <Button color="inherit" onClick={() => handleClick("/profile")}>
              <Typography style={{fontSize:"18px"}}>Profile</Typography>
              </Button>
              <Button color="inherit" onClick={() => handleClick("/logout")}>
              <Typography style={{fontSize:"18px"}}>Logout</Typography>
              </Button>
              <Button color="inherit" onClick={() => handleClick("/home")}>
              <Typography style={{fontSize:"18px"}}>Investor</Typography>
              </Button>
            </>
          )
        ) : (
          <>
            <Button color="inherit" onClick={() => handleClick("/login")}>
              <Typography style={{fontSize:"18px"}}>Login</Typography>
            </Button>
            <Button color="inherit" onClick={() => handleClick("/signup")}>
            <Typography style={{fontSize:"18px"}}>SignUp</Typography>
            </Button>
          </>
        )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
