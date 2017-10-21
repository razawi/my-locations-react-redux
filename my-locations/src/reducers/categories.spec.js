import categories from './categories'
import * as types from '../constants/ActionTypes'

describe('categories reducer', () => {
  it('should handle initial state', () => {
    expect(
        categories(undefined, {})
    ).toEqual(
        {
            categories: [],
            locations: [],
            currentCategory : '',
            currentLocation : ''
          }
        )
  })

  it('should add category', () => {
    expect(categories(undefined, {
          type: types.ADD_CATEGORY,
          text: 'Jest first category'
        })
      ).toEqual({
            categories: ['Jest first category'],
            locations: [],
            currentCategory : '',
            currentLocation : ''
          }
      )
  })

  it.skip('should add duplicant category', () => {
    
  })

  it.skip('should add to full list of categories', () => {
    
  })

  it.skip('should remove only category', () => {
    
  })

  it.skip('should remove one category of many', () => {
    
  })

  it.skip('should view a first category ', () => {
    
  })

  it.skip('should view a second category', () => {
    
  })

  it.skip('should edit viewd category', () => {
    
  })

})