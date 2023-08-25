import { createContext, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";

import Welcome, { ErrorPage } from "./component/Welcome";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Signup from "./component/Signup";
import Home from "./component/Home";
import Applications from "./component/Applications";
import Profile from "./component/Profile";
import CreateJobs from "./component/recruiter/CreateJobs";
import MyJobs from "./component/recruiter/MyJobs";
import JobApplications from "./component/recruiter/PitchApplications";
import AcceptedApplicants from "./component/recruiter/AcceptedApplicants";
import RecruiterProfile from "./component/recruiter/Profile";
import MessagePopup from "./lib/MessagePopup";
import isAuth, { userType } from "./lib/isAuth";
import News from "./component/News/news.js";
import JoinChat from "./component/chat/Join.js";
import HomeFundFinder from "./component/fund-finder/home-fundfinder.js";
import Form from "./component/recruiter/form.js"
import RecommendPitches from "./component/RecommendPitches"
import Meet from "./component/Meet";


const useStyles = makeStyles(
  (theme) => ({
    body: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "98vh",
      paddingTop: "64px",
      boxSizing: "border-box",
      width: "100%",
    },
  }));

export const SetPopupContext = createContext();
const TITLE = "FININVEST"

function App() {
  const classes = useStyles();
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });

  return (
    <BrowserRouter>

      <SetPopupContext.Provider value={setPopup}>

        <Grid container direction="column">
          <Grid item xs>
            <Navbar />
          </Grid>
          <Grid item className={classes.body}>
            <Switch>
            <Route exact path="/">
                <Welcome />
              </Route>
              <Route exact path="/home">
                <Welcome />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/logout">
                <Logout />
              </Route>
              <Route exact path="/home2">
                <Home />
              </Route>
              <Route exact path="/applications">
                <Applications />
              </Route>
              <Route exact path="/RecommendPitches">
                <RecommendPitches/>
              </Route>
              <Route exact path="/meet">
                <Meet/>
              </Route>

              <Route exact path="/profile">
                {userType() === "recruiter" ? (
                  <RecruiterProfile />
                ) : (
                  <Profile />
                )}
              </Route>
              <Route exact path="/addjob">
                <CreateJobs />
              </Route>
              <Route exact path="/myjobs">
                <MyJobs />
              </Route>
              <Route exact path="/job/applications/:jobId">
                <JobApplications />
              </Route>
              <Route exact path="/employees">
                <AcceptedApplicants />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
              <Route exact path="/fundfinder-home">
                <HomeFundFinder />
              </Route>
              <Route exact path="/join-chat">
                <JoinChat />
              </Route>
              <Route exact path="/form">
                <Form />
                </Route>
  
              <Route>
                <ErrorPage />
              </Route>
            </Switch>
          </Grid>
        </Grid>
        <MessagePopup
          open={popup.open}
          setOpen={(status) =>
            setPopup({
              ...popup,
              open: status,
            })
          }
          severity={popup.severity}
          message={popup.message}
        />
      </SetPopupContext.Provider>
    </BrowserRouter>
  );
}

export default App;