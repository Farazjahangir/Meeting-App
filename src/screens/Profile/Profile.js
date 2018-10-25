import React, { Component } from 'react'
import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';
import Steps, { Step } from 'rc-steps';
import './Profile.css'
import Header from '../../component/Header/Header'
import plusIcon from '../../images/plus.png'
import coffee from '../../images/coffee.jpg'
import juice from '../../images/juice.jpg'
import cocktail from '../../images/cocktail.jpg'
import { profileSaveToFirebase } from '../../config/Firebase/Firebase'
import MyMapComponent from '../../component/Map/Map'


class Profile extends Component {
  constructor() {
    super()
    this.state = {
      steps: 0,
      imgUrls : [],
      nickName : '',
      contactNum : '',
      bevarages : [],
      meetingTime : [],
      coords : {latitude : 24.946218 , longitude : 67.005615},
      finished : false
      
    }
    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
    this.handleImg = this.handleImg.bind(this)
    this.updateCoords = this.updateCoords.bind(this);
    this.setUpProfile = this.setUpProfile.bind(this);

  }

  nextStep() {
    const { steps } = this.state
    this.setState({ steps: steps + 1 })
  }
  prevStep() {
    const { steps } = this.state
    this.setState({ steps: steps - 1 })
  }

  handleImg(e){
    const { imgUrls , imgArr } = this.state    
      let reader = new FileReader();
      reader.onload = (e) => {
          let urlImg = e.target.result;
          this.setState({
            imgUrls: [...imgUrls , urlImg]
          })
      };
      reader.readAsDataURL(e.target.files[0]);
  }
      
  selectBev(bev){
        const { bevarages } = this.state
        if(!bevarages.includes(bev)){
          this.setState({bevarages : [...bevarages , bev]})
        }
        else{
          let index = bevarages.indexOf(bev)
          bevarages.splice(index , 1)
          this.setState({bevarages : bevarages})
        }
    }

  selectedTime(time){
    const { meetingTime } = this.state
    if(!meetingTime.includes(time)){
      this.setState({meetingTime : [...meetingTime , time]})
    }
    else{
      let index = meetingTime.indexOf(time)
      meetingTime.splice(index , 1)
      this.setState({meetingTime : meetingTime})
    }
  }

componentDidUpdate(){
  this.setPosition()
}

  setPosition() {
    const { coords } = this.state
    
    navigator.geolocation.getCurrentPosition((position)=>{
      // this.setState({coords: position.coords})     
      this.setState({coords: {latitude : position.coords.latitude , longitude : position.coords.longitude}})     
    })
  }


  updateCoords({latitude, longitude}) {
    this.setState({coords: {latitude, longitude}})
  }

  setUpProfile(){
    this.setState({finished : true})
    profileSaveToFirebase(this.state).then(()=>{
      this.props.history.push('/dashboard')
      console.log('UPLOADED');
      this.setState({finished : false})
      
    })
  }



  render() {
    const { steps,
            imgUrls, 
            nickName, 
            contactNum, 
            bevarages, 
            coords,
            meetingTime,
            finished
          } = this.state
    return (
      <div>
        <Header />

      <div className={finished ? "custom-loader" : "none"}>
        <h1 className="loader">
        <span class="let1">S</span>  
        <span class="let2">A</span>  
        <span class="let3">V</span>  
        <span class="let4">I</span>  
        <span class="let5">N</span>  
        <span class="let6">G</span>  
        </h1>

      </div>

        <div className={finished ? "container-fluid opacity-1" : "container-fluid"}>
          <div className="rc-steps">
            <Steps labelPlacement="vertical" current={steps} >
              <Step />
              <Step />
              <Step />
              <Step />
            </Steps>
          </div>
          {steps === 0 &&
            <div className="step-1">
              <div className="form-group">
                <input type="text" value={nickName} placeholder="Enter Your Nick Name" className="form-control" onChange={(e)=>{this.setState({nickName : e.target.value})}} required />
              </div>
              <div className="form-group">
                <input type="number" value={contactNum} placeholder="Your Contact Number" className="form-control" onChange={(e)=>{this.setState({contactNum : e.target.value})}} required />
              </div>
            </div>
          }
          {steps === 1 &&
            <div className="row my-5">
              <div className="col-md-4 col-sm-6 col-12 center-div my-2">
                <div className="img-div d-flex align-items-center justify-content-center">
                  <div>
                      {imgUrls.length >= 1 && <img src={imgUrls[0]} width="230" height="230px" />}
                      {imgUrls.length===0 && <img src={plusIcon} width="70px" />}
                        <input type="file" className="img-upload" onChange={this.handleImg} />
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12 center-div my-2">
                <div className="img-div  d-flex align-items-center justify-content-center">
                  <div>
                      {imgUrls.length >= 2 && <img src={imgUrls[1]} width="230px" height="230px" />}
                      {imgUrls.length <=1 && <img src={plusIcon} width="70px" />}
                      <input type="file" className="img-upload"  onChange={this.handleImg} />
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12 center-div my-2">
                <div className="img-div  d-flex align-items-center justify-content-center">
                  <div>
                      {imgUrls.length >= 3 && <img src={imgUrls[2]} width="230px" height="230px" />}
                      {imgUrls.length<=2 && <img src={plusIcon} width="70px" />}
                      <input type="file" className="img-upload"  onChange={this.handleImg} />
                  </div>
                </div>
              </div>
            </div>
          }
          {steps===2 && 
            <div>
                <div>
                  <h3 className="text-center font-1 mt-1">What Do You Prefer</h3>
                </div>
                <div className="row">
                  <div className="col-md-4 col-sm-6 col-12 my-5">
                    <img src={coffee} value="Coffee" width="100%" height="300px" className={bevarages.includes('coffee') ? "bevarages selected" : "bevarages"} onClick={()=>{this.selectBev('coffee')}} />
                    <h3 className="text-center">Coffee</h3>
                  </div>
                  <div className="col-md-4 col-sm-6 col-12 my-5">
                    <img src={juice} width="100%" height="300px" className={bevarages.includes('juice') ? "bevarages selected" : "bevarages"} onClick={()=>{this.selectBev('juice')}} />
                    <h3 className="text-center">Juice</h3>                    
                  </div>
                  <div className="col-md-4 col-sm-6 col-12 my-5">
                    <img src={cocktail} width="100%" height="300px" className={bevarages.includes('cocktail') ? "bevarages selected" : "bevarages"} onClick={()=>{this.selectBev('cocktail')}} />
                    <h3 className="text-center">cocktail</h3>                    
                  </div>
                </div>


                <h3 className="text-center font-1 mt-1">Duration For Meeting</h3>
                <div className="row my-5">

                  <div className="col-md-4 col-sm-6 col-12 my-3">
                    <div className={meetingTime.includes('120min') ? "text-center meeting-time-box selected-time" : "text-center meeting-time-box"} onClick={()=>{this.selectedTime("120min")}}>
                      <h1>120</h1>
                      <h3>Minutes</h3>
                    </div>
                  </div>

                  <div className="col-md-4 col-sm-6 col-12 my-3"> 
                    <div className={meetingTime.includes('60min') ? "text-center meeting-time-box selected-time" : "text-center meeting-time-box"} onClick={()=>{this.selectedTime("60min")}}>
                      <h1>60</h1>
                      <h3>Minutes</h3>
                    </div>
                  </div>

                  <div className="col-md-4 col-sm-6 col-12 my-3">
                    <div className={meetingTime.includes('30min') ? "text-center meeting-time-box selected-time" : "text-center meeting-time-box"} onClick={()=>{this.selectedTime("30min")}}>
                      <h1>30</h1>
                      <h3>Minutes</h3>
                    </div>
                  </div>

                </div>


              </div>
          }

          {steps===3 &&
          <div>
            <h1 className="text-center my-3">Your Location</h1>
            <MyMapComponent
              isMarkerShown={true}
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `600px` }} />}
              mapElement={<div style={{ height: `100%` }} />
            }
            coords={coords}
            updateCoords={this.updateCoords}
            />
              <div className="text-right my-5 mx-5">
                <input type="button" value="Finish" className="btn btn-success" onClick={this.setUpProfile} />
            </div>
          </div>
        }

            <div className="d-flex justify-content-between">
             {steps !== 0 && steps < 3 &&
             <div className="my-5">
                <input type="button" value="Back" className="btn btn-success" onClick={this.prevStep} />
              </div>
             }
              {steps !== 3 && 
              <div className="text-right my-5 mx-5">
                <input type="button" value="Next" className="btn btn-success" onClick={this.nextStep} />
              </div>}
            </div>
        </div>
      </div>
    )
  }
}

export default Profile
