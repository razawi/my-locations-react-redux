import React, { Component } from 'react'
import './CurrentLocationMenue.css'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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
                locations = {this.props.locations} categories = {this.props.categories}/>
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
      <div className="LocationPanelWrapper">
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


  class EditLocationPanel extends React.Component {
    constructor(props) {
      super(props);
      this.editLocation = Object.assign({},this.props.currentLocation);
      this.categoryChange = this.categoryChange.bind(this);
      this.editAddress = this.editAddress.bind(this);
      this.editName = this.editName.bind(this);
      this.editLat = this.editLat.bind(this);
      this.editLng = this.editLng.bind(this);
      
    }

    categoryChange = (selectedOption) => {
      this.selectedOption = selectedOption
      this.forceUpdate()
    }

    editAddress(event){
      this.editLocation.Address = event.target.value;
      this.forceUpdate()
    }

    editLat(event){
      this.editLocation.position.lat = event.target.value;
      this.forceUpdate()
    }

    editLng(event){
      this.editLocation.position.lng = event.target.value;
      this.forceUpdate()
    }

    editName(event){
        this.editLocation.Name = event.target.value;
        this.forceUpdate()
      }

    render(){
      const value = this.selectedOption && this.selectedOption.value || this.editLocation.Category;
      return (
        <div className="editLocationPanel">
          {/* <div className="dataWrapperLocationPanel"> */}
            <div className="addressPanel">
                <p>Address</p> 
                <input type="text" name="address" 
                    value={this.editLocation.Address}
                    onChange={this.editAddress}>
                </input>
            </div>

            <div className="categoryPanel">
                <p>Category</p> 
                <Select
                name="form-field-name"
                onChange={this.categoryChange}
                value={value}
                options={this.props.categories.map(function(cat){
                    return{value: cat, label: cat}
                })}
                />
            </div>

            <div className="namePanel">
                <p>Name</p> 
                <input type="text" name="name" 
                    value={this.editLocation.Name}
                    onChange={this.editName}>
                </input>
            </div>

            <div className="positionPanel">
              <p>position</p> 
              <div className="positionBox">
                <p> Lat : </p>
                <input type="text" name="name" 
                    value={this.editLocation.position.lat}
                    onChange={this.editLat}>
                 </input>
                <p> Long : </p>
                <input type="text" name="name" 
                    value={this.editLocation.position.lng}
                    onChange={this.editLng}>
                 </input>
              </div>
            </div>
          {/* </div> */}
          <div className="editActionCtrl">
            <button onClick={this.saveEdit} className="saveEdit">  
              Save
            </button>
            <button onClick={this.reloadEdit} className="reloadEdit">  
              Reload
            </button>
          </div>
        </div>
      )
    }
  }

const ViewLocationPanel = ({currentLocation, locations}) => {
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
            <p>position</p> 
            <div className="positionBox">
                <p> Lat : {currentLocation.position.lat}</p>
                <p> Long : {currentLocation.position.lng}</p>
            </div>
        </div>
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