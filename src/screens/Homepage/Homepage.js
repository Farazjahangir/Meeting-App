import React, { Component } from 'react'
import './Homepage.css'
import {loginWithFirebase , checkingUser , firebase} from '../../config/Firebase/Firebase'
import { Link } from "react-router-dom";

class Homepage extends Component {
    constructor(props){
        super()
        this.state = {
          user : false
        }
        this.login = this.login.bind(this)
    }
    componentDidMount(){
      firebase.auth().onAuthStateChanged((user)=>{
        if(user){
          checkingUser()
          .then((doc)=>{
              if(doc.exists){
                this.props.history.replace("/dashboard")
                this.setState({user : true})
              }
              else{
                this.props.history.replace("/profile")
                this.setState({user : true})
              }          
          })          
        }
      })
    }

    login(){
      loginWithFirebase()
      .then((user)=>{
        console.log('USER' , user);
        
      })
    }
    

  render() {
    const { user } = this.state
    return (
      <div>
        <div className="bg" id={!user ? "op" : ''}></div>
        <div className={user ? "hide" : "show"}>
          <div id="preloader">
            <div id="loader"></div>
          </div>
        </div>
        <div className="homepage-content" id={!user ? "op" : ''}>
            <h1>Explore The World And Make Friends</h1>
            <h2>Log In Here</h2>
            <button className="btn login-btn" onClick={this.login}>Log In With Facebook</button>
        </div>
      </div>
    )
  }
}

export default Homepage
