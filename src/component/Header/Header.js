import React, { Component } from 'react'
import { logOut } from '../../config/Firebase/Firebase'
import menuIcon from "../../images/menu.png";
import './Header.css'

class Header extends Component {
  constructor(props){
    super()
    this.signOut = this.signOut.bind(this)
  }

  signOut(){
    logOut()
    .then(()=>{
      console.log('logout');
      this.props.history.push('/meetingpoint')
    })
  }

  render() {
    return (
      <div>
        <header id="header">
            <h1>Meeting App</h1>
            <img src={menuIcon} className="menu-btn" />
        </header>
        <div className="side-menu">
          <ul>
            <li>
              <button onClick={this.signOut} className="">Log Out</button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Header
