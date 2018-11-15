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
      index: '',
      showDetails: false,
      likedUserList : false,
      requestedUserList : false,
      listBar : false,
      listBar2 : false,
      meetingsRequest: ''
    }
    this.setMeeting = this.setMeeting.bind(this)
    this.showLikedUsersList = this.showLikedUsersList.bind(this)
    this.showRequestedUsersList = this.showRequestedUsersList.bind(this)
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

    if(nextProps.requestedUsers.length === 0 && nextProps.meetingRequest.length === 0){
      this.setState({meetings : false , listBar : false , meetingData : false , listBar2 : false})
      return
    }

    if(!nextProps.requestedUsers.length){
      
      this.setState({listBar : false})
    }
    if(!nextProps.meetingRequest.length){
      this.setState({listBar2 : false})
    }


    if (nextProps.requestedUsers.length) {
      

      for (var i = 0; i < nextProps.requestedUsers.length; i++) {
        let likedUsersId = nextProps.requestedUsers[i].likedUserId
        await db.collection('users').doc(likedUsersId).get()
          .then((doc) => {
            otherUsersData.push(doc.data())
            otherUsersData[i].meetingPlace = nextProps.requestedUsers[i].meetingPlace
            otherUsersData[i].date = nextProps.requestedUsers[i].date
            otherUsersData[i].timeForMeeting = nextProps.requestedUsers[i].meetingTime
            otherUsersData[i].status = nextProps.requestedUsers[i].status
          })
      }
      this.setState({
        requestedUsers: otherUsersData,
        meetingData: true,
        listBar : true,
        meetings : true
      })  
    }
    
    let meetingRequestUserData = []
    if(nextProps.meetingRequest.length){
      
      for (var i = 0; i < nextProps.meetingRequest.length; i++) {
        let requestedUserId = nextProps.meetingRequest[i].requestedUserId
        await db.collection('users').doc(requestedUserId).get()
        .then((doc) => {
          meetingRequestUserData.push(doc.data())
          meetingRequestUserData[i].meetingPlace = nextProps.meetingRequest[i].meetingPlace
          meetingRequestUserData[i].date = nextProps.meetingRequest[i].date
          meetingRequestUserData[i].timeForMeeting = nextProps.meetingRequest[i].meetingTime
        })
      }
      this.setState({
        meetingsRequest: meetingRequestUserData,
        meetingData: true,
        listBar2 : true,
        meetings : true
      })
  
    }
  }


  setMeeting() {
    this.props.history.push('/meeting')
  }


  showLikedUsersList(){
    const { likedUserList } = this.state

    if(likedUserList === false){
      this.setState({likedUserList : true})
    }
    else if(likedUserList === true){
      this.setState({likedUserList : false})
    }
    
  }

  showRequestedUsersList(){
    const { requestedUserList } = this.state
    
    if(requestedUserList === false){
      this.setState({requestedUserList : true})
    }
    else if(requestedUserList === true){
      this.setState({requestedUserList : false})
    }
  }


  render() {

    

    const { meetings, 
            requestedUsers, 
            meetingData, 
            isStyle, 
            index, 
            showDetails, 
            likedUserList, 
            requestedUserList,
            listBar,
            listBar2,
            meetingsRequest
          } = this.state

    return (
      <div>
        <Header />
        {!meetings && <div className="text-center my-6">
          <h1 className="msg-heading" >You Haven't Set A Meeting Yet</h1>
          <button className="btn btn-success" onClick={this.setMeeting}>Go Set A Meeting</button>
        </div>}

        {listBar && <div className="liked-users">
          <p>Liked Users List</p>
          <img src={downArrow} onClick={this.showLikedUsersList} />

        </div>}
        {meetingData && <div className="container-fluid">
          <div className="row meeting-data">
            {likedUserList && requestedUsers.map((val, i) => {

              return <div className="col-sm-3 col-6" style={{position : 'static'}}>
                <div>
                  <div className='users-imgs'>
                    <img src={val.profilePicUrl} className={i === index && isStyle ? "brightness" : ''} width="350px" onMouseOver={() => { this.setState({ isStyle: true, index: i }) }} onMouseOut={() => { this.setState({ isStyle: false }) }} />
                    <button className={i === index && isStyle ? "btn btn-primary btn-sm show-btn " : 'hide-btn'} onMouseOver={() => { this.setState({ isStyle: true, index: i }) }} onMouseOut={() => { this.setState({ isStyle: false }) }} onClick={() => { this.setState({ showDetails: true }) }}>Details</button>
                  </div>
                  <p className="mx-2">{val.Nickname}</p>


                  {i===index && showDetails && <div className="details-div">
                    <h2 className="text-center">Meeting Details</h2>
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
                        <div>{val.status}</div>
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


        {listBar2 && <div className="liked-users">
          <p>Requested Users List</p>
          <img src={downArrow} onClick={this.showRequestedUsersList} />

        </div>}
        {meetingData && <div className="container-fluid">
          <div className="row meeting-data">
            {requestedUserList && meetingsRequest.map((val, i) => {

              return <div className="col-sm-3 col-6" style={{position : 'static'}}>
                <div>
                  <div className='users-imgs'>
                    <img src={val.profilePicUrl} className={i === index && isStyle ? "brightness" : ''} width="350px" onMouseOver={() => { this.setState({ isStyle: true, index: i }) }} onMouseOut={() => { this.setState({ isStyle: false }) }} />
                    <button className={i === index && isStyle ? "btn btn-primary btn-sm show-btn " : 'hide-btn'} onMouseOver={() => { this.setState({ isStyle: true, index: i }) }} onMouseOut={() => { this.setState({ isStyle: false }) }} onClick={() => { this.setState({ showDetails: true }) }}>Details</button>
                  </div>
                  <p className="mx-2">{val.Nickname}</p>


                  {i===index && showDetails && <div className="details-div">
                    <h2 className="text-center">Meeting Details</h2>                    
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
    requestedUsers: state.meetingReducer.likedUsers,
    meetingRequest : state.meetingReducer.meetingRequest
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
