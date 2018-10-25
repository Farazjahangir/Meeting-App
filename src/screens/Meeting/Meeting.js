import React, { Component } from 'react'
import './Meeting.css'
import Header from '../../component/Header/Header'
import Cards, { Card } from 'react-swipe-deck'
import { getUserData , firebase } from '../../config/Firebase/Firebase'
import img1 from '../../images/coffee.jpg'
import img2 from '../../images/juice.jpg'
import img3 from '../../images/cocktail.jpg'

const data = [img1 , img2 , img3];
let userData;



class Meeting extends Component {

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        console.log("logged in");
        getUserData().then((data)=>{
          console.log("DATA" , data);
          
          
          userData = data
      })
    }
    })
  }
    action(){
        console.log("hi");
        
    }
  render() {
    return (
      <div>
        <Header />
        <Cards onEnd={()=>{this.action('end')}} className={'master-root'} >
        {data.map(item =>
          <Card
            onSwipeLeft={()=>{this.action('swipe left')}} 
            onSwipeRight={()=>{this.action('swipe right')}} >
            <div className="users-div">
              <img src={item} />
            </div>
          </Card>
        )}
      </Cards>
      </div>
    )
  }
}

export default Meeting