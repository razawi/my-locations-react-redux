import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCategory } from '../actions'
import Reducers from '../reducers'

// const Category = ({ onClick, text }) => (
//   <li
//     onClick={onClick}
//   >
//     {text}
//   </li>
// )

// const mapStateToProps = (state, ownProps) => {
//   return {
//     categories : state.categories
//   }
// }

const ViewCategoryMenue = (props) => {
  debugger;
  const {currentTodo, updateCurrent} = props
  const handleInputChange = (evt) => {
    const val = evt.target.value
    updateCurrent(val)
  }
  return (
    <form>
      <input type="text"
        onChange={handleInputChange}
        value={currentTodo}/>
    </form>
  )
}

let AddCategory = ({ dispatch }) => {
  let input
  let props = this.props
  debugger;
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addCategory(input.value))
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

export default connect(
  (state) => ({categories: state.categories, 
               locations: state.locations,
               currentCategory: state.currentCategory,
               currentLocation: state.currentLocation
              }), {Reducers}
)(ViewCategoryMenue)
