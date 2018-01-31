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

    this.state = { Address: this.props.currentLocation.Address,
      Category : this.props.currentLocation.Category,
      Name : this.props.currentLocation.Name,
      positionLat : this.props.currentLocation.position.lat,
      positionLng : this.props.currentLocation.position.lng 
    }

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
      var editLocation = {
        Address: this.state.Address,
        Category : this.state.Category,
        Name : this.state.Name,
        position : {
          lat : this.state.positionLat,
          lng : this.state.positionLng
        }
      }
      this.props.editLocationAction(editLocation)
  }

  reloadEdit= (e) => {
      e.preventDefault();
      this.setState({ Address: this.props.currentLocation.Address,
        Category : this.props.currentLocation.Category,
        Name : this.props.currentLocation.Name,
        positionLat : this.props.currentLocation.position.lat,
        positionLng : this.props.currentLocation.position.lng 
      }, () => {
        this.categoryChange({value : this.state.Category})
      })
  }

  categoryChange = (selectedOption) => {
    this.setState({Category : selectedOption.value})
  }

  editAddress(event){
    this.setState({Address : event.target.value});
  }

  editLat(event){
    this.setState({ positionLat : event.target.value});
  }

  editLng(event){
    this.setState({positionLng : event.target.value});
  }

  editName(event){
    this.setState({ Name : event.target.value});
  }

  render(){
    return (
      <div className="editLocationPanel">
        <div className="LocationPanelDataWrap">
          <div className="addressPanel">
              <p>Address</p> 
              <input type="text" name="address" 
                  value={this.state.Address}
                  onChange={this.editAddress}>
              </input>
          </div>

          <div className="categoryPanel">
              <p>Category</p> 
              <Select
              name="category-select"
              onChange={this.categoryChange}
              value={this.state.Category }
              options={this.props.categories.map(function(cat){
                  return{value: cat, label: cat}
              })}
              />
          </div>

          <div className="namePanel">
              <p>Name</p> 
              <input type="text" name="name" 
                  value={this.state.Name}
                  onChange={this.editName}>
              </input>
          </div>

          <div className="positionPanel">
            <p>position</p> 
            <div className="positionBox">
              <div className="positionLine">
                <p> Lat : </p>
                <input type="number" step="any" 
                  value={this.state.positionLat}
                  onChange={this.editLat}>
                </input>
              </div>
              <div className="positionLine">
                <p> Long : </p>
                <input type="number" step="any" 
                    value={this.state.positionLng}
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
    this.state = { Address: '',
      Category : '',
      Name : '',
      positionLat : '',
      positionLng : ''
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
      var editLocation = {
        Address: this.state.Address,
        Category : this.state.Category,
        Name : this.state.Name,
        position : {
          lat : this.state.positionLat,
          lng : this.state.positionLng
        }
      }
      this.props.addLocationAction(editLocation)
  }

  reset= (e) => {
      e.preventDefault();
      this.setState ({ Address: '',
        Category : '',
        Name : '',
        positionLat : '',
        positionLng : ''
      }, () => {
        this.categoryChange({value : ''})
      })
  }

  categoryChange = (selectedOption) => {
    this.setState({ Category : selectedOption.value})
  }

  editAddress(event){
    this.setState({ Address : event.target.value});
  }

  editLat(event){
    this.setState({ positionLat : event.target.value});
  }

  editLng(event){
    this.setState({positionLng : event.target.value})
  }

  editName(event){
      this.setState({ Name : event.target.value});
    }

  render(){
    return (
      <div className="addLocationPanel">
        <div className="LocationPanelDataWrap">
          <div className="addressPanel">
              <p>Address</p> 
              <input type="text" name="address" 
                  value={this.state.Address}
                  onChange={this.editAddress}>
              </input>
          </div>

          <div className="categoryPanel">
              <p>Category</p> 
              <Select
                  name="form-field-name"
                  onChange={this.categoryChange}
                  value={this.state.Category}
                  options={this.props.categories.map(function(cat){
                      return{value: cat, label: cat}
                  })}
              />
          </div>

          <div className="namePanel">
              <p>Name</p> 
              <input type="text" name="name" 
                value={this.state.Name || ''}
                onChange={this.editName}>
              </input>
          </div>

          <div className="positionPanel">
            <p>position</p> 
            <div className="positionBox">
              <div className="positionLine">
                <p> Lat :</p>
                <input type="number" step="any" 
                  value={this.state.positionLat}
                  onChange={this.editLat}>
                </input>
              </div>
              <div className="positionLine">
                <p> Long : </p>
                <input type="number" step="any" 
                    value={this.state.positionLng}
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