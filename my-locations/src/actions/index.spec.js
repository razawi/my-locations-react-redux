import * as types from '../constants/ActionTypes'
import * as actions from './index'

const location = { Name : 'Raz', 
                   Address : 'Mekor Chaim 66',
                   Coordinates : '32.11,31.1',
                   Category: 'Home'
}
const categories =[]

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

  it('add location should create ADD_LOCATION action', () => {
    expect(actions.addLocation(location)).toEqual({
        payload: { location : location }, 
        type: "ADD_LOCATION"
    });
  })

  it('remove location should create REMOVE_LOCATION action', () => {
    expect(actions.removeLocation(location)).toEqual({
        payload: { location : location }, 
        type: "REMOVE_LOCATION"
    });
  })

  it('remove category should create EDIT_LOCATION action', () => {
    expect(actions.editLocation(location)).toEqual({
        payload: { location : location }, 
        type: "EDIT_LOCATION"
    });
  })


  
})
