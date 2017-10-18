import * as types from '../constants/ActionTypes'
import * as actions from './index'

var location = { Name : "Raz", 
Address : "Mekor Chaim 66",
Coordinates : "32.11,31.1",
Category: "Home"
}

describe('todo actions', () => {

  it('add category should create ADD_CATEGORY action', () => {
    expect(actions.addCategory('catogory')).toEqual({
      type: types.ADD_CATEGORY,
      text: 'catogory'
    })
  })

  it('remove category should create REMOVE_CATEGORY action', () => {
    expect(actions.removeCategory('catogory')).toEqual({
      type: types.REMOVE_CATEGORY,
      text: 'catogory'
    })
  })


  it('remove category should create EDIT_CATEGORY action', () => {
    expect(actions.editCategory('catogory')).toEqual({
      type: types.EDIT_CATEGORY,
      text: 'catogory'
    })
  })



//   addLocation = location => ({ type: types.ADD_LOCATION, location })
  it.skip('add location should create ADD_LOCATION action', () => {
    expect(actions.addLocation(location)).toEqual({
      type: types.ADD_LOCATION

    })
  })


  
//   removeLocation = location => ({ type: types.REMOVE_LOCATION, location })it('remove category should create REMOVE_CATEGORY action', () => {
  it.skip('remove category should create REMOVE_CATEGORY action', () => {
    expect(actions.removeCategory('catogory')).toEqual({
      type: types.REMOVE_CATEGORY,
      text: 'catogory'
    })
  })



  
//   editLocation = location => ({ type: types.EDIT_LOCATION, location })
  it.skip('remove category should create REMOVE_CATEGORY action', () => {
    expect(actions.removeCategory('catogory')).toEqual({
      type: types.REMOVE_CATEGORY,
      text: 'catogory'
    })
  })


  
})
