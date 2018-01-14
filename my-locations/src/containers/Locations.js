import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import './Locations.css'
import {MapComponent} from '../components/GoogleMap'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const CurrentLocation = ({}) => {
  return(
      <div className="currentLocation">
        <p> Current Location </p>
      </div>
    )
  }

const LocationsMenueHeader = ({menueView, setFilteredMenue, 
  setUnGroupedMenue, setGroupedMenue}) => {
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
      Filtered 
    </label>
    </div>
  )
}

class LocationLink extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    e.preventDefault();
    if (this.props.currentLocation.Name !== this.props.location.Name){
      //todo : set current location
      // debugger;
      this.props.viewLocation(this.props.location.Name)
    }
  }

 
  render(){
    const className = ((this.props.location.Name === this.props.currentLocation.Name) ? 'boldButton' : 'button')  
    return(
      <div className={"locationLink"}>
        <button key={this.props.location.Name + 'locationLinkkey'} onClick={this.handleClick}
          className={className}>
          {this.props.location.Name} 
        </button>
      </div>
    )
  }
}

const SortedCategoryLinks = ({category, locations, currentLocation, viewLocation }) => {
  return(
    <div className="sortedCategoryLinks">
      {locations.map((location) => { 
        if (location.Category === category){
          return(
            <LocationLink key={ location.Name + 'SortedCategorykey'}
            location={location} currentLocation = {currentLocation} 
            category={category} viewLocation={viewLocation}/>
          )
        }
        else {return null}
      })}
    </div>
  )
}

const CategoryTitle = ({category}) => {
  return (
    <div className="categoryTitle">
     <button key={category + 'buttonkey'}>
          {category} 
      </button>
    </div>
  )
}

const GroupedMenueContent = ({locations, currentLocation, categories, currentCategory, viewLocation}) => {
  return(
    <div className="groupedMenueContent">
      {categories.map(function(category) { 
      return(
        <div key={ category + 'link'} >
          <CategoryTitle category = {category}/>
          <SortedCategoryLinks category={category} 
            viewLocation ={viewLocation} locations={locations} 
            currentLocation = {currentLocation}  />
        </div>
      )
      })}
    </div>
  )
}

class FilteredMenueContent extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  selectedOption = null
  handleChange = (selectedOption) => {
    this.selectedOption = selectedOption
    this.forceUpdate()
  }

  render(){
    const value = this.selectedOption && this.selectedOption.value;
    return(
      <div className="filteredMenue">
        <Select
          name="form-field-name"
          onChange={this.handleChange}
          value={value}
          options={this.props.categories.map(function(cat){
            return{value: cat, label: cat}
          })}
        />

        <SortedCategoryLinks key={value + 'SortedClink'} 
          category={value} locations={this.props.locations} 
          currentLocation = {this.props.currentLocation} 
        />
      </div>
    )
  }
}

const UnGroupedMenueContent = ({locations, currentLocation}) => {
  return(
    <div className="locationsList">
    <br/>
      {locations.map(function(location) { 
        return(
          <LocationLink key={location.Name + 'key'}
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
      locations, currentLocation, categories, currentCategory, viewLocation}) => {
  let menueType = null;
  switch (menueView){
    case 'GROUPED' :
      menueType = <GroupedMenueContent locations = {locations} 
                  currentLocation = {currentLocation} viewLocation = {viewLocation}
                  categories = {categories} currentCategory = {currentCategory}/>
      break;
    case 'UNGROUPED' :
      menueType = <UnGroupedMenueContent locations = {locations} viewLocation = {viewLocation}
                                         currentLocation = {currentLocation} />
      break;
    case 'FILTERED' :
      menueType = <FilteredMenueContent locations = {locations} viewLocation = {viewLocation}
                                        currentLocation = {currentLocation} 
                                        categories = {categories} currentCategory = {currentCategory}/>
      break;
    default:
      menueType = <ErrorMenueContent/> 
      break;
  }

  return(
    <div className="locationsMenuePanel">
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
          categories = {this.props.categories}
          viewLocation = {this.props.viewLocation}/>
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
      addLocation: actions.addLocation,
      removeLocation: actions.removeLocation,
      editLocation: actions.editLocation,
      viewLocation: actions.viewLocation,
      setGroupedMenue : actions.setGroupedMenue,
      setUnGroupedMenue : actions.setUnGroupedMenue,
      setFilteredMenue : actions.setFilteredMenue
    }
)(LocationsPanel) 
