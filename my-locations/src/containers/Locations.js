import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import './Locations.css'

const CurrentLocation = ({}) => {
  return(
      <div className="currentLocation">
        <p> Current Location </p>
      </div>
    )
  }

const LocationsMenue = ({}) => {
  return(
    <div className="locationsMenue">
      <p> Locations Menue </p>
    </div>
  )
}

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="mapComponent"> 
        <p> Map </p>
      </div>
    )
  }
}

class LocationsPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="locationsPanel"> 
      <LocationsMenue />
      <div class="wrapper">
        <MapComponent />
        <CurrentLocation />
      </div>
      </div>
    )
  }
}

export default connect(
    function (state){
      return({
        categories : state.categories.list,
        currentCategory: state.categories.current,
        actionState : state.uiActions.actionState
      })
    },
    {
      addCategory: actions.addLocation,
      removeCategory: actions.removeLocation,
      editCategory: actions.editLocation,
      viewCategory: actions.viewLocation
    }
)(LocationsPanel)
