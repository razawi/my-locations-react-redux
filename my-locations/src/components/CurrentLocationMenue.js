import React, { Component } from 'react'
import './CurrentLocationMenue.css'

export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);
    this.selectPanel = this.selectPanel.bind(this);
  }

  panel = null

  selectPanel(){
    switch(this.props.actionState){
      case 'VIEW':
        this.panel = <ViewLocationPanel currentLocation = {this.props.currentLocation} 
            locations = {this.props.locations}/>
        break;

      case 'EDIT':
        this.panel = <EditLocationPanel currentLocation = {this.props.currentLocation} 
                locations = {this.props.locations}/>
        break;

      case 'REMOVE':
        this.panel = <RemoveLocationPanel currentLocation = {this.props.currentLocation} 
                locations = {this.props.locations}/>
        break;

      case 'ADD':
        this.panel = <AddLocationPanel currentLocation = {this.props.currentLocation} 
                locations = {this.props.locations}/>
        break;

      default:
        this.panel = <ErrorPanel/>
        break;
    }
  }

  render(){
    this.selectPanel()
    return(
      <div className="viewLocationPanelWrapper">
        {this.panel}
      </div>
    )
  }
}

const ErrorPanel = () => {
    return(
      <p> ERROR </p>
    )
  }

const ViewLocationPanel = ({currentLocation, locations}) => {
    debugger;
    return (
      <div className="viewLocationPanel">
        <div className="addressPanel">
            <p>Address</p> <p>{currentLocation.Address}</p>
        </div>

        <div className="categoryPanel">
            <p>Category</p> <p>{currentLocation.Category}</p>
        </div>

        <div className="namePanel">
            <p>Name</p> <p>{currentLocation.Name}</p>
        </div>

        <div className="positionPanel">
            <p>position</p> <p> Lat : {currentLocation.position.lat}</p>
            <p> Long : {currentLocation.position.lng}</p>
        </div>
      </div>
    )
  }

  const EditLocationPanel = ({currentLocation, locations}) => {
    return (
      <div className="editLocationPanel">
        <p>Edit panel </p>
      </div>
    )
  }

  const RemoveLocationPanel = ({currentLocation, locations}) => {
    return (
      <div className="removeLocationPanel">
         <p>Remove panel </p>
      </div>
    )
  }

  const AddLocationPanel = ({currentLocation, locations}) => {
    return (
      <div className="addLocationPanel">
         <p>Add panel </p>
      </div>
    )
  }