import React from 'react'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

// generated for this app
const API_KEY ='AIzaSyDQZnfW1bvZwOo0tlHiUDVLBczlsMkeQrU'

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=" + API_KEY,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: 32.077, lng: 34.774 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 32.077, lng: 34.774 }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)

export class MapComponent extends React.Component {
    constructor(props) {
      super(props);
      this.onMarkerClick = this.handleMarkerClick.bind(this);
      this.onMapClicked = this.handleMapClicked.bind(this);
    }


    handleMarkerClick = (e) => {
        console.log('handle marker click')
    }
    
    // mapProps, map, clickEvent
    handleMapClicked = (e) => {
        console.log('handle Map click')
        debugger;
    }
  
    render(){
      return (
        <div className="mapComponent"> 
            <MyMapComponent
                isMarkerShown={true}
                onMarkerClick={this.handleMarkerClick}
                onClick={this.handleMapClicked}
            />
        </div>
      )
    }
  }