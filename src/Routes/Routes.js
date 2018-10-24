import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import  HomePage  from "../screens/Homepage/Homepage";
import  Profile  from "../screens/Profile/Profile";


const Routes = () =>{
    return(
        <Router>
            <div>
                <Route exact path="/" component={HomePage} />
                <Route  path="/profile" component={Profile} />
            </div>
        </Router>
    )
}

export default Routes