/* eslint-disable no-undef */
/*global google*/
import React, { Component } from 'react'
import MyMapComponent from '../../component/Map/Map'

import '../../App.css'
import './Meetingpoint.css'
import Header from '../../component/Header/Header'
import { FusionTablesLayer } from 'react-google-maps';
let BASE_URI = "https://api.foursquare.com/v2/venues/search?"
let COORDS;
let INTENT = "browse"
let RADIUS;
let LIMIT = 5

class Meetingpoint extends Component {

    constructor(props) {
        super();
        this.state = {
            placeName: '',
            search: false,
            location: null,
            selectedPlace : '',
            index : null,
            isLoading : true,
            locationNotAvailaible : false,
            destinationCoords : {},
            originCoords : {},
            directions : null,
            // getDirection : true
        }

        this.next = this.next.bind(this)
        // this.getDirections = this.getDirections.bind(this)
    }
    componentDidMount() {
        let coords = this.props.location.state.data.Coords
        
        
        RADIUS = 5000
        COORDS = this.props.location.state.data.Coords
        const COFFEE = '4bf58dd8d48988d1e0931735'
        const JUICE = '4bf58dd8d48988d112941735'
        const COCKTAIL = '4bf58dd8d48988d11e941735'
        let USER_BEV = []
        this.props.location.state.data.Bevarages.map((item) => {
            if (item === 'juice') USER_BEV.push(JUICE)
            if (item === "coffee") USER_BEV.push(COFFEE)
            if (item === "cocktail") USER_BEV.push(COCKTAIL)
        })
        USER_BEV = USER_BEV.join(',')

        fetch(`${BASE_URI}&ll=${COORDS.latitude},${COORDS.longitude}&categoryId=${USER_BEV}&intent=${INTENT}&radius=${RADIUS}&limit=${LIMIT}&client_id=AXY5PZIGNOVK2N43M3Y2G1K2S4UOJWOVQQVYNOS2OS4N33DU&client_secret=SSCDKVQ3XWYW5EXWOUFP1ECUCOHETEEJPGFY2A4OK0QVOTII&v=20180612`)
            .then((res) => {
                return res.json()
            })
            .then((places) => {
                this.setState({ location: places, search: true , isLoading: false , originCoords : coords })

            })
    }


    searchForPlaces() {
        const { placeName } = this.state
        this.setState({search : false})

        let QUERY = placeName
        fetch(`${BASE_URI}ll=${COORDS.latitude},${COORDS.longitude}&intent=${INTENT}&radius=${RADIUS}&query=${QUERY}&client_id=AXY5PZIGNOVK2N43M3Y2G1K2S4UOJWOVQQVYNOS2OS4N33DU&client_secret=SSCDKVQ3XWYW5EXWOUFP1ECUCOHETEEJPGFY2A4OK0QVOTII&v=20180612`)
            .then((res) => {
                return res.json()
            })
            .then((places) => {
                if(places.response.venues.length === 0){
                    
                    this.setState({locationNotAvailaible : true , isLoading : false})
                }
                else{
                    this.setState({ search : true , location: places})
                }
            })

    }

    meetingPlace(location , i){
        
        let distance =  location.location.distance / 1000
        let avgDistance = distance.toFixed(1)
        
        this.setState({
            selectedPlace : location.name, 
            destinationCoords : {lat : location.location.lat , lng : location.location.lng},
            index : i,
            avgDistance
        })
    }

    // getDirections() {
    //     const { originCoords , destinationCoords } = this.state
    //     this.setState({getDirection : true})
    //     const DirectionsService = new google.maps.DirectionsService();
       
    //       DirectionsService.route({
    //         origin: new google.maps.LatLng(originCoords.latitude , originCoords.longitude),
    //         destination: new google.maps.LatLng(destinationCoords.lat , destinationCoords.lng),
    //         travelMode: google.maps.TravelMode.DRIVING,
    //       }, (result, status) => {
    //         if (status === google.maps.DirectionsStatus.OK) {
    //             console.log("IF");
    //             console.log(result);
                
                
    //           this.setState({
    //             directions: result,
    //           });
    //         } else {
    //             console.log("ELSE");
                
    //           alert("Sorry! Can't calculate directions!")
    //         }
    //       });
    //   }
    

    next(){
        const likedUserData = this.props.location.state.data
        const { selectedPlace , destinationCoords } = this.state
        this.props.history.replace('/meetingTime' , {place : selectedPlace , destinationCoords , userData : likedUserData})
    }


    render() {
        

        const { directions ,placeName, location, search , index , locationNotAvailaible , isLoading , originCoords , getDirection} = this.state
      
          
      
        
        return (
            <div>



        {/* {getDirection && 
            <div>
                <MyMapComponent 
                isMarkerShown 
                coords={originCoords}                           
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDsi4jd69OnCt7XQy3ejVJa9Zk2UxXvpHM&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `600px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                directions={directions}
                />
        </div>
        } */}

                <Header />
                {locationNotAvailaible && <h3 className="error-location">Location Not Found</h3>}
                {isLoading &&<p id="custom-loader">Fetching Locations...</p>}

                <div className="my-6">

                    <div className="input-group my-5 location-search">
                        <input type="text" value={placeName} onChange={(e) => { this.setState({ placeName: e.target.value }) }} className="form-control" placeholder="Search For Location" />
                    </div>
                        <button onClick={() => { this.searchForPlaces() }} className="btn btn-success">Search</button>

                    {search &&
                        <div>
                            <h1 className="text-center font-1">Your NearBy Locations</h1>
                            <ul className="list-group">
                                {location.response.venues.map((location , i)=>{
                                    return <li className="list-group-item d-flex justify-content-between location" id={index === i ? "selected" : ''} onClick={()=>{this.meetingPlace(location, i)}} key={i}>
                                        <div >{location.name}</div>
                                        <div>{location.location.distance / 1000} KM</div>
                                    </li>
                                })}
                            </ul>
                            <div className="text-center my-3">
                                <button className="btn btn-danger mx-2" onClick={this.getDirections}>Get Direction</button>
                                <button className="btn btn-primary" onClick={this.next}>Next</button>
                            </div>
                        </div>}
                </div>

            </div>
        )
    }
}


export default Meetingpoint