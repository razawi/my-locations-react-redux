import * as types from '../constants/ActionTypes'

export const addCategory = text => ({ type: types.ADD_CATEGORY, text })
export const removeCategory = text => ({ type: types.REMOVE_CATEGORY, text })
export const editCategory = text => ({ type: types.EDIT_CATEGORY, text })
export const addLocation = location => ({ type: types.ADD_LOCATION, location : location })
export const removeLocation = location => ({ type: types.REMOVE_LOCATION, location : location })
export const editLocation = location => ({ type: types.EDIT_LOCATION, location : location })
