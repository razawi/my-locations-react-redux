import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import './Locations.css'
import {MapComponent} from '../components/GoogleMap'

const CurrentLocation = ({}) => {
  return(
      <div className="currentLocation">
        <p> Current Location </p>
      </div>
    )
  }

const LocationsMenue = ({}) => {
  let grouped = true
  let ungrouped
  let filtered

  const handleInputChange = (event) => {
    const value = event.target.value
    grouped = (value === "grouped") ? true : false 
    ungrouped = (value === "ungrouped") ? true : false 
    filtered = (value === "filtered") ? true : false 
  }

  return(
    <div className="locationsMenue">
      <div className="locationsViewBar">
      <label>
        <input
          name="locationsView"
          value = "grouped"
          type="radio"
          checked={true} 
          onChange={handleInputChange} />
        Grouped
      </label>

      <label>
        <input
          name="locationsView"
          value = "ungrouped"
          type="radio"
          /* checked={ungrouped} */
          onChange={handleInputChange} />
        UnGrouped
      </label>
      <label>
        <input
          name="locationsView"
          value = "filtered"
          type="radio"
          /* checked={filtered} */
          onChange={handleInputChange} />
        Filtered comboBox
      </label>
      </div>
      <div className="locationsList">
       <p> filtered Locations List </p>
      </div>
    </div>
  )
}


class LocationsPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="locationsPanel"> 
      <LocationsMenue />
      <div className="wrapper">
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
