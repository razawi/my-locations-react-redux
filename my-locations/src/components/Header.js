import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import './Header.css'
import uiActions from '../reducers/uiActions'

const HeaderTitle = ({actionState}) => {
  let url = window.location.href
  let title= ''

  if (url.search('Categories') > -1)
    title= "Categories"
  else if (url.search('Locations') > -1)
    title= "Locations"
  else
    title= "My-Locations App"

  return (
    <div className="title">
      <p>
        {title}
      </p>
    </div>
   )
}

const ViewElement = ({setActionView, actionState}) => {
  let color= 'black';
  if (actionState === "VIEW") 
    color= 'red';

  return (
    <div className="action">
      <button type="button" style={{color: color}} onClick= {e => {
          setActionView()
        }}>
        View
      </button>
    </div>
  )
}

const EditElement = ({setActionEdit, actionState}) => {
  let color= 'black';
  if (actionState === "EDIT") 
    color= 'red';

  return (
    <div className="action">
      <button type="button" style={{color: color}} onClick= {e => {
          setActionEdit()
        }}>
        Edit
      </button>
    </div>
  )
}

const AddElement = ({setActionAdd, actionState}) => {
  let color= 'black';
  if (actionState === "ADD") 
    color= 'red';

  return (
    <div className="action">
      <button type="button" style={{color: color}} onClick= {e => {
          setActionAdd()
        }}>
        Add
      </button>
    </div>
  )
}

const RemoveElement = ({setActionRemove, actionState}) => {
  let color= 'black';
  if (actionState === "REMOVE") 
    color= 'red';

  return (
    <div className="action">
      <button type="button" style={{color: color}} onClick= {e => {
          setActionRemove()
        }}>
        Remove
      </button>
    </div>
  )
}

const Header =({actionState, setActionAdd, setActionEdit, setActionRemove, setActionView}) => {
  return (
    <div className="header">
      <HeaderTitle actionState = {actionState} />

      <div className="actionsMenue">
        <ViewElement 
          setActionView = {setActionView}
          actionState = {actionState} />

        <EditElement
          setActionEdit = {setActionEdit}
          actionState = {actionState} />

        <AddElement
          setActionAdd = {setActionAdd}
          actionState = {actionState} />

        <RemoveElement
          setActionRemove = {setActionRemove}
          actionState = {actionState} />
    </div>
  </div>
  )
}

export default connect(
  state => ({
    actionState : state.uiActions.actionState
  }),
  {
    setActionAdd: actions.setActionAdd,
    setActionRemove: actions.setActionRemove,
    setActionEdit: actions.setActionEdit,
    setActionView: actions.setActionView
  }
)(Header)

