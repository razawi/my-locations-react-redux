import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCategory } from '../actions'
import Reducers from '../reducers'


const ViewLocationsMenue = (props) => {
  debugger;

}

export default connect(
  (state) => ({categories: state.categories, 
               locations: state.locations,
               currentCategory: state.currentCategory,
               currentLocation: state.currentLocation
              }), {Reducers}
)(ViewLocationsMenue)
