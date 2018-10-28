import React, { Component } from 'react'
import './Meeting.css'
import Header from '../../component/Header/Header'
import Cards, { Card } from '../../lib/react-swipe-deck'
import { getUserData , firebase , getOtherUsers } from '../../config/Firebase/Firebase'
import img1 from '../../images/coffee.jpg'
import img2 from '../../images/juice.jpg'
import img3 from '../../images/cocktail.jpg'
import dot from '../../images/circle.png'
import dot1 from '../../images/circle1.png'


const data = [img1 , img2 , img3];
let userData;



class Meeting extends Component {

  constructor(){
    super()
    this.state = {
      users : false,
      index : 0,
      matchedUsersArr : [],
      dotSelect1 : true,
      dotSelect2 : false,
      dotSelect3 : false,
      meet : false,
      reject : false,
      end :false
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        console.log("logged in");
        getUserData().then((data)=>{
          userData = data
          this.setState({users : true})
          getOtherUsers(userData)
          .then((matchedUsers)=>{
            let { matchedUsersArr } = this.state
            this.setState({matchedUsersArr : [...matchedUsersArr , ...matchedUsers]})         
          })
          
      })
      
    }
  })
}
  next(){
    const { index } = this.state
    this.setState({index : index + 1})
  }
    action(direction){
        if(direction == 'right'){
          console.log("right");
          this.setState({
            dotSelect1 : true,
            dotSelect2 : false,
            dotSelect3 : false,
            index : 0,
            meet : true
          })
          setTimeout(()=>{
          this.setState({meet : false})
          },800)
        }        
        if(direction == 'left'){
          this.setState({
            dotSelect1 : true,
            dotSelect2 : false,
            dotSelect3 : false,
            index : 0,
            reject : true
          })
          setTimeout(()=>{
            this.setState({reject : false})
            },800)  
        }
    }
    userEnd(){
      console.log("END");
      this.setState({end : true})
    }
  render() {
    const { index, 
            matchedUsersArr, 
            dotSelect1, 
            dotSelect2, 
            dotSelect3,
            meet,
            reject,
            end
          }= this.state
    
    return (
      <div>
        <Header />
        <Cards onEnd={()=>{this.userEnd()}}  className={'master-root'} >
        {matchedUsersArr.map(item =>
          <Card
            onSwipeLeft={()=>{this.action('left')}} 
            onSwipeRight={()=>{this.action('right')}}>
            <div className="users-div">
            <div class="decision text-right">
              <p className={meet ? 'meet visible' : 'meet'}>Meet</p>
              <p className={reject ? 'reject visible' : 'reject' }>Reject</p>
            </div>
                  <img src={item.UserImages[index]} />
                  <div class="dot-div">
                    {!dotSelect1 && <img src={dot} onClick={()=>{this.setState({index: 0 , dotSelect1 : true , dotSelect2 : false , dotSelect3 : false})}} />}
                    {dotSelect1 && <img src={dot1}  />}
                    {!dotSelect2 && <img src={dot} onClick={()=>{this.setState({index: 1 , dotSelect2 : true , dotSelect1 : false , dotSelect3 : false})}} />}
                    {dotSelect2 && <img src={dot1} />}
                    {!dotSelect3 && <img src={dot} onClick={()=>{this.setState({index: 2 , dotSelect3 : true , dotSelect2 : false , dotSelect1 : false})}} />}
                    {dotSelect3 && <img src={dot1} />}
                  </div>
                  <h4 className="username">{item.Nickname}</h4>
            </div>
          </Card>
        )}
      </Cards>
        {end && <h2 class="end">No More Match Users Found</h2>}
        <button onClick={()=>{this.next()}}>NEXT</button>
      </div>
    )
  }
}

export default Meeting