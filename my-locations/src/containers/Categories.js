import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ADD_CATEGORY, REMOVE_CATEGORY, EDIT_CATEGORY, VIEW_CATEGORY } from '../constants/ActionTypes'
import { addCategory } from '../actions'


const mapStateToProps = (state) => {
  return {
    categories : state.categories,
    locations: state.locations,
    currentCategory: state.currentCategory,
    currentLocation: state.currentLocation
  }
}

function mapDispatchToProps(dispatch) {
  debugger;
  return({
     addCategory: (value) => {dispatch(addCategory(value))}
  })
}

const ViewCategoryMenue = (props) => {
  debugger;
  return (
    <form>
      <ul>
        <li>{props.categories.list[props.categories.list.length -1]}</li>
      </ul>
      <input type="text"/>
      <AddCategory> </AddCategory>
    </form>
  )
}



const AddCategory = () => {
  let input
  //et props = this.props
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        addCategory(input.value)
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Category
        </button>
      </form>
    </div>
  )
}


export default connect(mapStateToProps, 
  mapDispatchToProps) (ViewCategoryMenue)
