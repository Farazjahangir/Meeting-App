import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import  HomePage  from "../screens/Homepage/Homepage";
import  Profile  from "../screens/Profile/Profile";
import  Dashboard  from "../screens/Dashboard/Dashboard";
import  Meeting  from "../screens/Meeting/Meeting";
import  Meetingpoint  from "../screens/Meetingpoint/Meetingpoint";



const Routes = () =>{
    return(
        <Router>
            <div>
                <Route exact path="/" component={HomePage} />
                <Route  path="/profile" component={Profile} />
                <Route  path="/dashboard" component={Dashboard} />
                <Route  path="/meeting" component={Meeting} />
                <Route  path="/meetingpoint" component={Meetingpoint} />
            </div>
        </Router>
    )
}

export default Routes