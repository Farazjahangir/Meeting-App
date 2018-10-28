import React, { Component } from 'react'
import './Meetingpoint.css'
import Header from '../../component/Header/Header'
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
            location: null
        }
    }
    componentDidMount() {
        RADIUS = 3000
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
                this.setState({ location: places, search: true })

            })
    }
    searchForPlaces() {
        const { placeName } = this.state

        let QUERY = placeName
        fetch(`${BASE_URI}ll=${COORDS.latitude},${COORDS.longitude}&intent=${INTENT}&radius=${RADIUS}&client_id=AXY5PZIGNOVK2N43M3Y2G1K2S4UOJWOVQQVYNOS2OS4N33DU&client_secret=SSCDKVQ3XWYW5EXWOUFP1ECUCOHETEEJPGFY2A4OK0QVOTII&v=20180612`)
            .then((res) => {
                return res.json()
            })
            .then((places) => {
                this.setState({ location: places})
            })

    }


    render() {

        const { placeName, location, search } = this.state
      
           {search &&  console.log(location.response.venues)}

      
        
        return (
            <div>
                <Header />
                <div className="input-group my-5" style={{ width: '85%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <input type="text" value={placeName} onChange={(e) => { this.setState({ placeName: e.target.value }) }} className="form-control" placeholder="Search For Location" />
                    <button onClick={() => { this.searchForPlaces() }} className="btn btn-success">Search</button>
                </div>

                {search &&
                    <div>
                        <h1>Your NearBy Locations</h1>
                        {location.response.venues.map((location) => {
                            console.log("location -->", location)
                            return <ul className="list-group">
                                <div>
                                <li className="list-group-item location-selection my-2">{location.name}
                                    <span>{location.location.distance}</span>
                            
                                </li>
                                </div>
                            </ul>
                        })}
                    </div>}

            </div>
        )
    }
}


export default Meetingpoint