import React, { Component } from 'react'
import { logOut } from '../../config/Firebase/Firebase'
import menuIcon from "../../images/menu.png";
import closeIcon from "../../images/cancel.png";
import './Header.css'
import { withRouter } from 'react-router-dom';

class Header extends Component {
  constructor(props){
    super()
    this.state = {
      showMenu : false
    }
    this.signOut = this.signOut.bind(this)
  }

  signOut(){
    logOut()
    .then(()=>{
      console.log('logout');
      this.props.history.push('/')
    })
  }

  render() {
    const { showMenu } = this.state
    return (
      <div>
        <header id="header">
            <h1>Meeting App</h1>
            <img src={menuIcon} style={{cursor : 'pointer'}} onClick={()=>{this.setState({showMenu : true})}} />
        </header>
        <nav className={showMenu ? "menu-bar open-menu" : 'hide-menu'} >
          <div style={{marginTop : '70px'}} className="text-right">
            <img src={closeIcon} style={{cursor : 'pointer'}}  onClick={()=>{this.setState({showMenu : false})}} />
          </div> 
          <ul>
            <li className="mx-4">
              <button className="btn btn-primary" onClick={this.signOut} >SignOut</button>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default withRouter(Header)
