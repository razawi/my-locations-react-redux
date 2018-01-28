import { SET_ACTION_ADD, SET_ACTION_REMOVE, SET_ACTION_EDIT, SET_ACTION_VIEW } from '../constants/ActionTypes'

const initialState = {
  actionState : "EDIT"
}

export default function uiActions (state = initialState, action = {}) {
  switch (action.type) {
    case SET_ACTION_ADD:
      return Object.assign({}, state, {
        actionState : "ADD"
      });

    case SET_ACTION_REMOVE:
      return Object.assign({}, state, {
        actionState : "REMOVE"
      });

    case SET_ACTION_VIEW:
      return Object.assign({}, state, {
        actionState : "VIEW"
      });

    case SET_ACTION_EDIT:
      return Object.assign({}, state, {
       actionState : "EDIT"
      });

    default:
      return state
  }
}
