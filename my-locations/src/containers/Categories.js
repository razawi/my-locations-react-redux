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
      actionForm = <EditCategory editCategory={editCategory}
                                 currentCategory={currentCategory}/> 
      break;
    case 'REMOVE':
      actionForm = <RemoveCategory removeCategory={removeCategory}
                                   currentCategory={currentCategory}/> 
      break;
    case 'ADD':
      actionForm = <AddCategory addCategory={addCategory}/>      
      break;
    default:
      actionForm = null;
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
    <div className="actionFrame">
        <button type="button">
           Category
        </button>
    </div>
  )
}

const AddCategory = ({addCategory}) => {
  let input
  return (
    <div className="actionFrame">
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

const RemoveCategory = ({removeCategory, currentCategory}) => {
  return (
    <div className="actionFrame">
        <button type="button" onClick= {e => {
          removeCategory('Raz')
        }}>
          Remove Category
        </button>
    </div>
  )
}

const EditCategory = ({EditCategory, currentCategory}) => {
  return (
    <div className="actionFrame">

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
