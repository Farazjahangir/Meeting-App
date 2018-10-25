import React, { Component } from 'react'
import Header from '../../component/Header/Header'


class Dashboard extends Component {
    constructor(props){
        super()
        this.setMeeting = this.setMeeting.bind(this)
    }

    setMeeting(){
        this.props.history.push('/meeting')
    }
  render() {
    return (
      <div>
          <Header />
          <div className="text-center my-5">
            <h1>You Haven't Set A Meeting Yet</h1>
            <button className="btn btn-success" onClick={this.setMeeting}>Go Set A Meeting</button>
          </div>
      </div>
    )
  }
}

export default Dashboard
