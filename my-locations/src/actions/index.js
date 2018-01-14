import * as types from '../constants/ActionTypes'

export const addCategory = (text) => ({ type: types.ADD_CATEGORY, text })
export const removeCategory = (text) => ({ type: types.REMOVE_CATEGORY, text })
export const editCategory = text => ({ type: types.EDIT_CATEGORY, text })
export const viewCategory = text => ({ type: types.VIEW_CATEGORY, text })

export const addLocation = location => ({ type: types.ADD_LOCATION, payload: {location : location} })
export const removeLocation = location => ({ type: types.REMOVE_LOCATION, payload: {location : location} })
export const editLocation = location => ({ type: types.EDIT_LOCATION, payload: {location : location}})
export const viewLocation = location => ({ type: types.VIEW_LOCATION, payload: {location : location}})

export const setGroupedMenue = () => ({type: types.GROUP_MENUE})
export const setUnGroupedMenue = () => ({type: types.UNGROUP_MENUE})
export const setFilteredMenue = () => ({type: types.FILTER_MENUE})

export const setActionAdd = () => ({ type: types.SET_ACTION_ADD })
export const setActionRemove = () => ({ type: types.SET_ACTION_REMOVE})
export const setActionEdit = () => ({ type: types.SET_ACTION_EDIT})
export const setActionView = () => ({ type: types.SET_ACTION_VIEW})