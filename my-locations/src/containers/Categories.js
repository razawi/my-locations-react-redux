import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import './Categories.css'

const CategoriesPanel = ({actionState, categories, currentCategory, 
                          addCategory, removeCategory, editCategory}) => {
  let actionForm = null;
  switch(actionState){
    case 'VIEW':
      actionForm = <ViewCategory category={currentCategory}/> 
      break;
    case 'EDIT':
      actionForm = <EditCategory editCategory={editCategory}/> 
      break;
    case 'REMOVE':
      actionForm = <RemoveCategory removeCategory={removeCategory}/> 
      break;
    case 'ADD':
      actionForm = <AddCategory addCategory={addCategory}/>      
      break;
    default:

      break
  }
  return (
    <div className="categoriesPanel"> 

      <ViewCategoryMenue
        categories = {categories}
        currentCategory = {currentCategory} />

      <div className="actionPanel">
        {actionForm}
      </div>
    </div>
  )
}

const ViewCategory = ({Category}) => {
  return (
    <div>
        <button type="button">
           Category
        </button>
    </div>
  )
}

const AddCategory = ({addCategory}) => {
  let input
  return (
    <div>
        <input ref={node => input = node} />
        <button type="button" onClick= {e => {
          addCategory(input.value)
          input.value = ''
        }}>
          Add Category
        </button>
    </div>
  )
}

const RemoveCategory = ({removeCategory}) => {
  return (
    <div>
        <button type="button" onClick= {e => {
          removeCategory('Raz')
        }}>
          Remove Category
        </button>
    </div>
  )
}

const EditCategory = ({EditCategory}) => {
  return (
    <div>
        <button type="button" onClick= {e => {
          EditCategory('Raz')
        }}>
          Remove Category
        </button>
    </div>
  )
}


const ViewCategoryMenue = ({categories: {list}, currentCategory}) => {
  
  return (
    <div className="viewMenue">
      <ul>
        {list.map(category => (
          <li key={ category }> { category } </li>
        ))}
      </ul>
    </div>
  )
}

export default connect(
  state => ({
    categories : state.categories,
    currentCategory: state.currentCategory,
    actionState : state.uiActions.actionState
  }),
  {
    addCategory: actions.addCategory,
    removeCategory: actions.removeCategory,
    editCategory: actions.editCategory
  }
)(CategoriesPanel)
