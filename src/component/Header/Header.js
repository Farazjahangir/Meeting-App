import React, { Component } from 'react'
import { logOut , gettingNotifications , firebase } from '../../config/Firebase/Firebase'
import menuIcon from "../../images/menu.png";
import closeIcon from "../../images/cancel.png";
import dummy from "../../images/dummy-pic.png";
import bellIcon from '../../images/bell.svg'
import notificationIcon from '../../images/notification.png'
import './Header.css'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { get } from 'https';
import getNotification from '../../Redux/Actions/notifyAction';

let userUid = ''

class Header extends Component {
  constructor(props){
    super()
    this.state = {
      showMenu : false,
      notificationShow : false,
      notified : false,
      notificatons : null
    }
    this.signOut = this.signOut.bind(this)
  }

  componentDidMount(){
    userUid = firebase.auth().currentUser.uid;  
    this.props.getNotification(userUid)
  }

  static getDerivedStateFromProps(nextProps){
      return{
        notifications : nextProps.notification, 
        notified : nextProps.notificationFlag
      }    
    
  }

  openNotify(){
    const { notificationShow } = this.state

    if(notificationShow) this.setState({notificationShow : false})
    
    else this.setState({notificationShow : true})

    let db = firebase.firestore()

    db.collection("users").doc(userUid).update({notificationFlag : false})
  }

  signOut(){
    logOut()
    .then(()=>{
      this.props.history.push('/')
    })
  }

  render() {
    const { notifications , notified } = this.state
    console.log('NOTIFICATIONS' , this.state.notifications);
    
    const { showMenu , notificationShow } = this.state
    return (
      <div>
        <header id="header">
            <h1>Meeting App</h1>
            <div>
              {!notified && <img src={bellIcon} width="35px" className="mx-3" style={{cursor : 'pointer'}} onClick={()=>{this.openNotify()}} />}
              {notified && <img src={notificationIcon} width="35px" className="mx-3" style={{cursor : 'pointer'}} onClick={()=>{this.openNotify()}} />}
              <img src={menuIcon} style={{cursor : 'pointer'}} onClick={()=>{this.setState({showMenu : true})}} />
            </div>
        </header>
        {notificationShow &&
          <div className="notification-div" >
            {notifications.map((value)=>{
              return <div className="notification">
                <img src={value.img} width="30px" height="30px" />
                <p>{value.Name}</p>
              </div>
            })}
          </div>
        }

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

const mapDispatchToProps = (dispatch) =>{
  return{
    getNotification : (userUid)=> dispatch(getNotification(userUid))
  } 
}

const mapStateToProps = (state) =>{
  console.log('reduxstate====>' ,  state);
  
  return{
    notification : state.notifyReducer.notification,
    notificationFlag : state.notifyReducer.notificationFlag,
  }
  

}

// export default withRouter(Header)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
