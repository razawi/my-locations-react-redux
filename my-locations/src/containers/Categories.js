import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

const ViewCategoryMenue = ({categories: {list}, addCategory, removeCategory}) => (
  <form>
    <ul>
      {list.map(category => (
        <li>{ category }</li>
      ))}
    </ul>
    <AddCategory addCategory={addCategory}/>
    <RemoveCategory removeCategory={removeCategory}/>
  </form>
)

const AddCategory = ({addCategory}) => {
  let input
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        const trimmedValue = input.value.trim()
        if (!trimmedValue) {
          return
        }
        addCategory(input.value)
        input.value = ''
      }}>
        <input ref={node => input = node} />
        <button type="submit">
          Add Category
        </button>
      </form>
    </div>
  )
}

const RemoveCategory = ({removeCategory}) => {
  let input
  return (
    <div>
      <form onSubmit={e => {
        removeCategory('Raz')
        input.value = ''
      }}>
        <input ref={node => input = node} />
        <button type="submit">
          Remove Category
        </button>
      </form>
    </div>
  )
}


export default connect(
  state => ({
    categories : state.categories,
    locations: state.locations,
    currentCategory: state.currentCategory,
    currentLocation: state.currentLocation
  }),
  {
    addCategory: actions.addCategory,
    removeCategory: actions.removeCategory
  }
)(ViewCategoryMenue)
