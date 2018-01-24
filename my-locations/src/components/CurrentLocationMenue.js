import React, { Component } from 'react'
import './CurrentLocationMenue.css'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);
    this.selectPanel = this.selectPanel.bind(this);
  }

  selectPanel(){
    switch(this.props.actionState){
      case 'VIEW':
        this.panel = <PanelViewLocation currentLocation = {this.props.currentLocation} 
            locations = {this.props.locations}/>
        break;

      case 'EDIT':
        this.panel = <PanelEditLocation currentLocation = {this.props.currentLocation} 
                locations = {this.props.locations} categories = {this.props.categories}
                editLocationAction = {this.props.editLocationAction}/>
        break;

      case 'REMOVE':
        this.panel = <PanelRemoveLocation currentLocation = {this.props.currentLocation} 
                locations = {this.props.locations} removeLocationAction = {this.props.removeLocationAction}/>
        break;

      case 'ADD':
        this.panel = <PanelAddLocation currentLocation = {this.props.currentLocation} 
        locations = {this.props.locations} categories = {this.props.categories}
        addLocationAction = {this.props.addLocationAction}/>
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

  class PanelEditLocation extends React.Component {
    constructor(props) {
      super(props);
      this.editLocation = JSON.parse(JSON.stringify(this.props.currentLocation))
      this.previousCurrent = JSON.parse(JSON.stringify(this.props.currentLocation))
      this.categoryChange = this.categoryChange.bind(this);
      this.editAddress = this.editAddress.bind(this);
      this.editName = this.editName.bind(this);
      this.editLat = this.editLat.bind(this);
      this.editLng = this.editLng.bind(this);
      this.reloadEdit = this.reloadEdit.bind(this);
      this.saveEdit = this.saveEdit.bind(this);
    }

    saveEdit = (e) => {
        e.preventDefault();
        this.props.editLocationAction(this.editLocation)
    }

    reloadEdit= (e) => {
        e.preventDefault();
        this.editLocation = JSON.parse(JSON.stringify(this.props.currentLocation))
        this.categoryChange({value : this.editLocation.Category})
        this.forceUpdate();
    }

    categoryChange = (selectedOption) => {
      this.selectedOption = selectedOption
      if (selectedOption && selectedOption.value )
        this.editLocation.Category = selectedOption.value
      else
        this.editLocation.Category = ''
      this.forceUpdate()
    }

    editAddress(event){
      this.editLocation.Address = event.target.value;
      this.forceUpdate()
    }

    editLat(event){
      if(parseInt(event.target.value)){
        this.editLocation.position.lat = parseInt(event.target.value);
        this.forceUpdate()
      }
    }

    editLng(event){
      if(parseInt(event.target.value)){
        this.editLocation.position.lng = parseInt(event.target.value);
        this.forceUpdate()
      }
    }

    editName(event){
        this.editLocation.Name = event.target.value;
        this.forceUpdate()
      }

    render(){
      const value = this.selectedOption && this.selectedOption.value || this.editLocation.Category;

      if (JSON.stringify(this.previousCurrent) !== JSON.stringify(this.props.currentLocation)){
        this.editLocation = JSON.parse(JSON.stringify(this.props.currentLocation))
        this.previousCurrent = JSON.parse(JSON.stringify(this.props.currentLocation))
      }

      return (
        <div className="editLocationPanel">
          <div className="LocationPanelDataWrap">
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
                name="category-select"
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
                <div className="positionLine">
                  <p> Lat : </p>
                  <input type="text" name="name" 
                    value={this.editLocation.position.lat}
                    onChange={this.editLat}>
                  </input>
                </div>
                <div className="positionLine">
                  <p> Long : </p>
                  <input type="text" name="name" 
                      value={this.editLocation.position.lng}
                      onChange={this.editLng}>
                  </input>
                </div>
              </div>
            </div>
          </div>
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

const PanelViewLocation = ({currentLocation, locations}) => {
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

class PanelRemoveLocation extends React.Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
  }

  remove = (e) => {
    this.props.removeLocationAction();
    debugger;
  }

  render(){
    return (
      <div className="removeLocationPanel">
        <div className="LocationPanelDataWrap">
          <div className="nameRemovePanel">
              <p> {this.props.currentLocation.Name || ' '} </p> 
          </div>
        </div>
        <div className="editActionCtrl">
          <button onClick={this.remove} className="removeButton">  
            Remove
          </button>
        </div>
      </div>
    )
  }
}

class PanelAddLocation extends React.Component {
  constructor(props) {
    super(props);
    this.editLocation = {
      Address: '', Category: '', position: {lat: 0, lng: 0}, Name: ''
    }
    this.categoryChange = this.categoryChange.bind(this);
    this.editAddress = this.editAddress.bind(this);
    this.editName = this.editName.bind(this);
    this.editLat = this.editLat.bind(this);
    this.editLng = this.editLng.bind(this);
    this.reset = this.reset.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
  }

  saveEdit = (e) => {
      e.preventDefault();
      this.props.addLocationAction(this.editLocation)
  }

  reset= (e) => {
      e.preventDefault();
      this.editLocation = { 
          Name : '', 
          Address : '',
          position: {
            lat: 0,
            lng: 0,
          },
          Category: ''    
      }
      this.categoryChange({value : ''})
      this.forceUpdate();
  }

  categoryChange = (selectedOption) => {
    this.selectedOption = selectedOption
    if (selectedOption && selectedOption.value )
      this.editLocation.Category = selectedOption.value
    else
      this.editLocation.Category = ''
    this.forceUpdate()
  }

  editAddress(event){
    this.editLocation.Address = event.target.value;
    this.forceUpdate()
  }

  editLat(event){
    if(parseInt(event.target.value)){
      this.editLocation.position.lat = parseInt(event.target.value);
      this.forceUpdate()
    }
  }

  editLng(event){
    if(parseInt(event.target.value)){
      this.editLocation.position.lng = parseInt(event.target.value);
      this.forceUpdate()
    }
  }

  editName(event){
      this.editLocation.Name = event.target.value;
      this.forceUpdate()
    }

  render(){
    const value = this.selectedOption && this.selectedOption.value;
    return (
      <div className="addLocationPanel">
        <div className="LocationPanelDataWrap">
          <div className="addressPanel">
              <p>Address</p> 
              <input type="text" name="address" 
                  value={this.editLocation.Address || ''}
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
                value={this.editLocation.Name || ''}
                onChange={this.editName}>
              </input>
          </div>

          <div className="positionPanel">
            <p>position</p> 
            <div className="positionBox">
              <div className="positionLine">
                <p> Lat :</p>
                <input type="text" name="name" 
                  value={this.editLocation.position.lat}
                  onChange={this.editLat}>
                </input>
              </div>
              <div className="positionLine">
                <p> Long : </p>
                <input type="text" name="name" 
                    value={this.editLocation.position.lng}
                    onChange={this.editLng}>
                </input>
               </div>
            </div>
          </div>
        </div>
        <div className="editActionCtrl">
          <button onClick={this.saveEdit} className="saveEdit">  
            Save
          </button>
          <button onClick={this.reset} className="reset">  
            Reset
          </button>
        </div>
      </div>
    )
  
  }
}