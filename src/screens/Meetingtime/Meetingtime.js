import React, { Component } from 'react'
import '../../App.css'
import swal from 'sweetalert';


import './Meetingtime.css'
import Header from '../../component/Header/Header'
import Calendar from 'react-calendar';
import { savingLikedUserData } from '../../config/Firebase/Firebase'
 
class Meetingtime extends Component {
    constructor(){
        super()
        this.state = {
            date: new Date(),
            defaultTime : '00:00'
        }
        this.sendRequest = this.sendRequest.bind(this)
    }


    selectDate = date => this.setState({ date })

    sendRequest(){
        swal('Send Request',{
            buttons : ['Cancle' , 'Yes']
          })
          .then((value)=>{
            if(value){
                console.log(value);
                let likedUser = this.props.location.state.userData 
                savingLikedUserData(likedUser)
        
            //   this.props.history.push('/dashboard')
            }
            
          })
      
    }

  render() {
      console.log(this.props);
      
    const { defaultTime } = this.state
    
    return (
      <div>
          <Header />
          <h2 className="text-center my-6 head-1">Select Time And Date For Meeting</h2>
          <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <Calendar
                    onChange={this.selectDate}
                    value={this.state.date}
                    className={'center-calender'}
                    />
                </div>
                <div className="col-md-5 vertical-center">
                    <div className="time-div">
                        <label for="time">Select Time</label>
                        <input type='time' value={defaultTime} id="time" className="form-control" onChange={(e)=>{
                            this.setState({defaultTime : e.target.value})}} />
                    </div>
                </div>
            </div>
            <button className="btn btn-danger btn-block custom-btn" onClick={this.sendRequest}>Send Request</button>
          </div>
      </div>
    )
  }
}


export default Meetingtime