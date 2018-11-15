import React, { Component } from 'react'
import './Dashboard.css'
import Header from '../../component/Header/Header'
import '../../App.css'
import { firebase, geetingAllMeetingsHistory } from '../../config/Firebase/Firebase'
import { connect } from 'react-redux'
import gettingMeetings from '../../Redux/Actions/meetingActions';
import downArrow from '../../images/down-arrow.png'

const db = firebase.firestore()

class Dashboard extends Component {
  constructor(props) {
    super()
    this.state = {
      meetings: true,
      requestedUsers: '',
      meetingData: false,
      isStyle: false,
      inex: '',
      showDetails: false,
      likedUserList : false
    }
    this.setMeeting = this.setMeeting.bind(this)
    this.showLikedUsersList = this.showLikedUsersList.bind(this)
  }

  componentDidMount() {
    const userUid = firebase.auth().currentUser.uid;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const messaging = firebase.messaging();
        const db = firebase.firestore()
        messaging
          .requestPermission()
          .then(function () {
            return messaging.getToken();
          })
          .then(function (currentToken) {
            //   saving user token in database
            db.collection("users")
              .doc(userUid)
              .update({
                userToken: currentToken
              });
          })
          .catch(function (err) {
          });

        messaging.onMessage(payload => {
        });
      }
    })
    this.props.gettingMeetings(userUid)
  }

  async componentWillReceiveProps(nextProps) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userUid = firebase.auth().currentUser.uid;
      }
    })
    let otherUsersData = []
    if (nextProps.requestedUsers) {

      for (var i = 0; i < nextProps.requestedUsers.length; i++) {
        let likedUsersId = nextProps.requestedUsers[i].likedUserId
        await db.collection('users').doc(likedUsersId).get()
          .then((doc) => {
            otherUsersData.push(doc.data())
            otherUsersData[i].meetingPlace = nextProps.requestedUsers[i].meetingPlace
            otherUsersData[i].date = nextProps.requestedUsers[i].date
            otherUsersData[i].timeForMeeting = nextProps.requestedUsers[i].meetingTime
          })
      }
      this.setState({
        requestedUsers: otherUsersData,
        meetingData: true
      })
    }
  }


  setMeeting() {
    this.props.history.push('/meeting')
  }


  showLikedUsersList(){
    console.log('sjhdsad');
    
    const { likedUserList } = this.state


    if(likedUserList === false){
      this.setState({likedUserList : true})
      console.log(likedUserList);
    }
    else if(likedUserList === true){
      this.setState({likedUserList : false})
      console.log(likedUserList);
    }
    

  }
  render() {

    const { meetings, requestedUsers, meetingData, isStyle, index, showDetails, likedUserList } = this.state

    return (
      <div>
        <Header />
        {!meetings && <div className="text-center my-6">
          <h1 className="msg-heading" >You Haven't Set A Meeting Yet</h1>
          <button className="btn btn-success" onClick={this.setMeeting}>Go Set A Meeting</button>
        </div>}

        {<div className="liked-users">
          <p>Liked Users List</p>
          <img src={downArrow} onClick={this.showLikedUsersList} />

        </div>}
        {meetingData && <div className="container-fluid">
          <div className="row meeting-data">
            {likedUserList && requestedUsers.map((val, i) => {
              console.log("LOOP", val);

              return <div className="col-sm-3 col-6" style={{position : 'static'}}>
                <div>
                  <div className='users-imgs'>
                    <img src={val.profilePicUrl} className={i === index && isStyle ? "brightness" : ''} width="350px" onMouseOver={() => { this.setState({ isStyle: true, index: i }) }} onMouseOut={() => { this.setState({ isStyle: false }) }} />
                    <button className={i === index && isStyle ? "btn btn-primary btn-sm show-btn " : 'hide-btn'} onMouseOver={() => { this.setState({ isStyle: true, index: i }) }} onMouseOut={() => { this.setState({ isStyle: false }) }} onClick={() => { this.setState({ showDetails: true }) }}>Details</button>
                  </div>
                  <p className="mx-2">{val.Nickname}</p>


                  {i===index && showDetails && <div className="details-div">
                    <ul className="list-group">
                      <li className="d-flex justify-content-between list-group-item">
                        <div>Name</div>
                        <div>{val.Nickname}</div>
                      </li>
                      <li className="d-flex justify-content-between list-group-item">
                        <div>meetingPlace</div>
                        <div>{val.meetingPlace}</div>
                      </li>
                      <li className="d-flex justify-content-between list-group-item">
                        <div>Date</div>
                        <div>{val.date.getDate()}/{val.date.getMonth()}/{val.date.getFullYear()}</div>
                      </li>
                      <li className="d-flex justify-content-between list-group-item list-group-item">
                        <div>Time</div>
                        <div>{val.timeForMeeting}</div>
                      </li>
                      <li className="d-flex justify-content-between list-group-item">
                        <div>Status</div>
                        <div>Pending</div>
                      </li>
                    </ul>
                    <div className="text-right">
                      <button className="btn btn-danger my-3" onClick={()=>{this.setState({showDetails : false})}}>Cancle</button>
                    </div>

                  </div>}
                </div>

              </div>

            })}
          </div>
        </div>}

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gettingMeetings: (userUid) => dispatch(gettingMeetings(userUid))
  }

}

const mapStateToProps = (state) => {

  return {
    requestedUsers: state.meetingReducer.likedUsers
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
