import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import './Categories.css'

const CategoriesPanel = ({actionState, categories, currentCategory, 
                          addCategory, removeCategory, editCategory, viewCategory}) => {
  let actionForm = null;
  switch(actionState){
    case 'VIEW':
      actionForm = <ViewCategory category={currentCategory}/> 
      break;
    case 'EDIT':
      actionForm = <EditCategory editCategory={editCategory}
                                 currentCategory={currentCategory} categories= {categories}/> 
      break;
    case 'REMOVE':
      actionForm = <RemoveCategory removeCategory={removeCategory}
                                   currentCategory={currentCategory}/> 
      break;
    case 'ADD':
      actionForm = <AddCategory addCategory={addCategory}/>      
      break;
    default:
      actionForm = <Error/> 
      break;
  }
  return (
    <div className="categoriesPanel"> 
      <ViewCategoryMenue
        categories = {categories}
        currentCategory = {currentCategory} 
        viewCategory = {viewCategory}/>

      <div className="actionPanel">
        {actionForm}
      </div>
    </div>
  )
}

const Error = () => {
  return (
    <div className="actionFrame">
        <p>
           Error
        </p>
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
  let input
  return (
    <div className="actionFrame">
        <input ref={node => input = node} />
        <button type="button" onClick= {e => {
          removeCategory(input.value)
          input.value = ''
        }}>
          Remove Category
        </button>
    </div>
  )
}

const EditCategory = ({editCategory, currentCategory, categories}) => {
  let input
  return (
    <div className="actionFrame">

        <input ref={node => input = node} />
        <button type="button" onClick= {e => {
          debugger;
          editCategory(input.value)
          input.value = ''
        }}>
          Edit Category
        </button>
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
    console.log('The link was clicked.')
  }

  render(){
    return (
      <button key={this.props.text} onClick={this.handleClick}> 
        {this.props.text} 
      </button>
    )
  }
}

const CategoryLink = (props) => {
  let linkButton = null;
  if (props.category === props.currentCategory){
    linkButton = <BoldButton text={props.category} viewCategory={props.viewCategory}/>
  }
  else{
    linkButton = <LinkButton text={props.category} viewCategory={props.viewCategory}/>
  }
  return (
    <div key={props.category}>
      {linkButton}
    </div>
  )
}

const ViewCategoryMenue = ({categories, currentCategory, viewCategory}) => {
  return (
    <div className="viewMenue">
        {categories.map(function(category) { 
          return(
            <CategoryLink key={category + 'link'} category={category} 
                currentCategory ={currentCategory} viewCategory={viewCategory}/>
          )
        })}
    </div>
  )
}

export default connect(
   function (state){
    return({
      categories : state.categories.list,
      currentCategory: state.categories.current,
      actionState : state.uiActions.actionState
    })
  },
  {
    addCategory: actions.addCategory,
    removeCategory: actions.removeCategory,
    editCategory: actions.editCategory,
    viewCategory: actions.viewCategory
  }
)(CategoriesPanel)
