import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCategory } from '../actions'
import Reducers from '../reducers'


const mapStateToProps = (state) => {
  return {
    categories : state.categories,
    locations: state.locations,
    currentCategory: state.currentCategory,
    currentLocation: state.currentLocation
  }
}

const ViewCategoryMenue = (props) => {
  return (
    <form>
      <ul>
        <li>{props.categories.current}</li>
      </ul>
      <input type="text"/>
    </form>
  )
}

export default connect(
  mapStateToProps, {Reducers}
)(ViewCategoryMenue)



// let AddCategory = ({ dispatch }) => {
//   let input
//   let props = this.props
//   return (
//     <div>
//       <form onSubmit={e => {
//         e.preventDefault()
//         if (!input.value.trim()) {
//           return
//         }
//         dispatch(addCategory(input.value))
//         input.value = ''
//       }}>
//         <input ref={node => {
//           input = node
//         }} />
//         <button type="submit">
//           Add Category
//         </button>
//       </form>
//     </div>
//   )
// }