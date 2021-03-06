import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker , DirectionsRenderer} from "react-google-maps"


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  
<GoogleMap
    defaultZoom={13}
    center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >
    {props.isMarkerShown && <Marker position={{ lat: props.coords.latitude, lng: props.coords.longitude  }} draggable={true}  onDragEnd={position => { props.updateCoords({latitude: position.latLng.lat(), longitude: position.latLng.lng()})}} controlPosition={1} />}

    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
))

export default MyMapComponent