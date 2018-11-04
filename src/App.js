import React, { Component } from 'react';
import './App.css';
import Routes from './Routes/Routes'
import store from './Redux/store'
import { Provider } from 'react-redux'
import { firebase } from './config/Firebase/Firebase'


class App extends Component {
  constructor(){
    super()
    this.state = {flag : false}

    this.userChecking = this.userChecking.bind(this)
  }


userChecking(){
  firebase.auth().onAuthStateChanged((user)=>{
    const flag = true;
    this.setState({flag})
  })
}

  componentDidMount(){
    console.log("COMPONENTDID2");
    firebase.auth().onAuthStateChanged((user)=>{
    })
  
    
    this.userChecking()
  }

  render() {
    const { flag } = this.state
    
    return (
      <div>
          {flag && <Provider store={store}>
            <Routes />
          </Provider>}
      </div>
    );
  }
}

export default App;
