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

const LocationsMenueHeader = ({menueView, setFilteredMenue, setUnGroupedMenue, setGroupedMenue}) => {

  const handleInputChange = event => {
    switch (event.target.value) {
      case 'grouped' :
        setGroupedMenue()
        break;
      case 'ungrouped' :
        setUnGroupedMenue()
        break;
      case 'filtered' :
        setFilteredMenue()
        break;
      default:
        break;
    }
  }

  return (
    <div className="locationsViewBar">
    <label>
      <input
        name="locationsView1"
        value = "grouped"
        type="radio"
        checked={menueView === "GROUPED"} 
        onChange ={handleInputChange}/>
      Grouped
    </label>
    <label>
      <input
        name="locationsView2"
        value = "ungrouped"
        type="radio"
        checked={menueView === "UNGROUPED"} 
        onChange={handleInputChange} />
      UnGrouped
    </label>
    <label>
      <input
        name="locationsView3"
        value = "filtered"
        type="radio"
        checked={menueView === "FILTERED"}
        onChange={handleInputChange} />
      Filtered comboBox
    </label>
    </div>
  )
}

const BoldButton = (props) => {
  return (
    <button key={props.text} style={{color: 'blue'}}>
      {props.text} 
    </button>
  )
}

class LinkButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.viewCategory(this.props.text)
    console.log('The link was clicked.');
  }

  render(){
    return (
      <button key={this.props.text} onClick={this.handleClick}> 
        {this.props.text} 
      </button>
    )
  }
}

const LocationLink = ({location, currentLocation}) => {
    return(
      <p> {location.Name} </p>
    )
}

const SortedCategoryLink = ({category, currentCategory, locations, currentLocation }) => {
  return(
    <div className="blahtest">
      <p> {category} </p>
      {locations.map((location) => { 
        if (location.Category === category){
          return(
            <LocationLink key={location.toString() + 'key'}
            location={location} currentLocation = {currentLocation} 
            category={category} />
          )
        }
        else {return null}
      })}
    </div>
  )
}

const GroupedMenueContent = ({locations, currentLocation, categories, currentCategory}) => {

  return(
    <div className="groupedMenueContent">
      {categories.map(function(category) { 
      return(
        <SortedCategoryLink key={category + 'link'} 
          category={category} currentCategory ={currentCategory} 
          locations={locations} currentLocation = {currentLocation} 
        />
      )
      })}
    </div>
  )
}

const FilteredMenueContent = ({locations, currentLocation, categories, currentCategory}) => {

  return(
    <p> FILTERED </p>
  )
}

const UnGroupedMenueContent = ({locations, currentLocation}) => {
  return(
    <div className="locationsList">
      {locations.map(function(location) { 
        return(
          <LocationLink key={location.toString() + 'key'}
            location={location} currentLocation = {currentLocation} />
        )
      })}
    </div> 
  )
}

const ErrorMenueContent = () => {
  return(
    <p> ERROR </p>
  )
}

const LocationsMenue = ({menueView, setFilteredMenue, setUnGroupedMenue, setGroupedMenue, 
      locations, currentLocation, categories, currentCategory}) => {
  let menueType = null;
  switch (menueView){
    case 'GROUPED' :
      menueType = <GroupedMenueContent locations = {locations} 
                  currentLocation = {currentLocation} 
                  categories = {categories} currentCategory = {currentCategory}/>
      break;
    case 'UNGROUPED' :
      menueType = <UnGroupedMenueContent locations = {locations} 
                                         currentLocation = {currentLocation} 
                                         categories = {categories} currentCategory = {currentCategory}/>
      break;
    case 'FILTERED' :
      menueType = <FilteredMenueContent locations = {locations} 
                                        currentLocation = {currentLocation} 
                                        categories = {categories} currentCategory = {currentCategory}/>
      break;
    default:
      menueType = <ErrorMenueContent/> 
      break;
  }

  return(
    <div className="LocationsMenuePanel">
      <LocationsMenueHeader menueView={menueView}
          setFilteredMenue = {setFilteredMenue}
          setUnGroupedMenue = {setUnGroupedMenue}
          setGroupedMenue = {setGroupedMenue} />
 
        {menueType}
      
    </div>)
}

class LocationsPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="locationsPanel"> 
        <LocationsMenue menueView={this.props.menueView}
          setFilteredMenue = {this.props.setFilteredMenue}
          setUnGroupedMenue = {this.props.setUnGroupedMenue}
          setGroupedMenue = {this.props.setGroupedMenue} 
          locations = {this.props.locations}
          currentLocation = {this.props.currentLocation}
          currentCategory = {this.props.currentCategory}
          categories = {this.props.categories}/>
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
        locations : state.locations.list,
        currentLocation : state.locations.current,
        actionState : state.uiActions.actionState,
        menueView : state.locations.menueView
      })
    }, {
      addCategory: actions.addLocation,
      removeCategory: actions.removeLocation,
      editCategory: actions.editLocation,
      viewCategory: actions.viewLocation,
      setGroupedMenue : actions.setGroupedMenue,
      setUnGroupedMenue : actions.setUnGroupedMenue,
      setFilteredMenue : actions.setFilteredMenue
    }
)(LocationsPanel) 


/*
        <select className="origCategoryName"  ref = {node => menu = node}>
          {categories.map(function(category) { 
            return(
              <option value={category}>{category}</option>
            )
          })}
        </select>
*/