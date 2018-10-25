import React, { Component } from 'react'
import './Homepage.css'
import {loginWithFirebase , checkingUser} from '../../config/Firebase/Firebase'
import { Link } from "react-router-dom";

class Homepage extends Component {
    constructor(props){
        super()
        
        this.login = this.login.bind(this)
    }

    login(){
      loginWithFirebase()
      .then((user)=>{
        console.log('USER' , user);
        
        checkingUser()
        .then((doc)=>{
            if(doc.exists){
              this.props.history.replace("/dashboard")
            }
            else{
              this.props.history.replace("/profile")
            }          
        })
      })
    }
    

  render() {
    return (
      <div>
        <div className="bg"></div>
        <div className="homepage-content">
            <h1>Explore The World And Make Friends</h1>
            <h2>Log In Here</h2>
            <button className="btn login-btn" onClick={this.login}>Log In With Facebook</button>
        </div>
      </div>
    )
  }
}

export default Homepage
