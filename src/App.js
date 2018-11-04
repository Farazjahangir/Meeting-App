import React, { Component } from 'react';
import './App.css';
import Routes from './Routes/Routes'
import store from './Redux/store'
import { Provider } from 'react-redux'
import { firebase } from './config/Firebase/Firebase'


class App extends Component {
  constructor(){
    super()
    this.state = {login : false}
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({login : true})
        console.log("APP If");
        
      } 
    })
    return true
  }
  render() {
    const { login } = this.state
    
    return (
      <div>
          {login && <Provider store={store}>
            <Routes />
          </Provider>}
      </div>
    );
  }
}

export default App;
