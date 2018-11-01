import React, { Component } from 'react'
import './Homepage.css'
import {loginWithFirebase , checkingUser , firebase} from '../../config/Firebase/Firebase'
import { Link } from "react-router-dom";

class Homepage extends Component {
    constructor(props){
        super()
        this.state = {
          isLoading : true,
        }
        this.login = this.login.bind(this)
    }
    componentDidMount(){
      console.log("COMPONENT DID MOUNT");
      
      firebase.auth().onAuthStateChanged((user)=>{
        // Checking user login 
        if(user){
          // function to check user profile
          checkingUser()
          .then((doc)=>{
            // if user Profile exist
            if(doc.exists){
              console.log('DOC  ====>' , doc);
                this.setState({isLoading: false})
                this.props.history.replace("/dashboard")
              }
              else{
                this.setState({isLoading: false})
                this.props.history.replace("/profile")
              }  
            })          
          }
          // if user not login
          else{
            this.setState({isLoading: false})
          }
      })
    }

    login(){
      loginWithFirebase()
      .then((user)=>{
        // function to check user profile
        checkingUser()
        .then((doc)=>{
            if(doc.exists){
              this.props.history.replace("/dashboard")
            }
            else{
              this.props.history.replace("/profile")
            }  
          })          

        console.log('USER' , user);
        
      })
    }
    

  render() {
    const { isLoading } = this.state
    return (
      <div>
        {/* div for background image */}
        <div className="bg" id={isLoading ? "op" : ''}></div>
        {/* loader */}
        <div className={isLoading ? "show" : "hide"}>
          <div id="preloader">
            <div id="loader"></div>
          </div>
        </div>

        
        <div className="homepage-content" id={isLoading ? "op" : ''}>
            <h1>Explore The World And Make Friends</h1>
            <h2>Log In Here</h2>
            <button className="btn login-btn" onClick={this.login}>Log In With Facebook</button>
        </div>
      </div>
    )
  }
}

export default Homepage
