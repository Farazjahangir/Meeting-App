import React, { Component } from 'react'
import './Dashboard.css'
import Header from '../../component/Header/Header'
import '../../App.css'
import { firebase } from '../../config/Firebase/Firebase'


class Dashboard extends Component {
    constructor(props){
        super()
        this.setMeeting = this.setMeeting.bind(this)
    }

    componentDidMount(){
      firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            const userUid = firebase.auth().currentUser.uid; 
            const messaging = firebase.messaging();
            const db = firebase.firestore()   
            messaging
            .requestPermission()
            .then(function() {
              console.log("Notification permission granted.");
              return messaging.getToken();
            })
            .then(function(currentToken) {
              //   saving user token in database
              db.collection("users")
                .doc(userUid)
                .update({
                  userToken: currentToken
                });
            })
            .catch(function(err) {
              console.log("Unable to get permission to notify.", err);
            });
      
          messaging.onMessage(payload => {
            console.log("payload", payload);
          });
        }
      })      
    }


    setMeeting(){
        this.props.history.push('/meeting')
    }
  render() {
    return (
      <div>
          <Header />
          <div className="text-center my-6">
            <h1 className="msg-heading" >You Haven't Set A Meeting Yet</h1>
            <button className="btn btn-success" onClick={this.setMeeting}>Go Set A Meeting</button>
          </div>
      </div>
    )
  }
}

export default Dashboard
