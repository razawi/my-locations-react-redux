import categories from './categories'
import * as types from '../constants/ActionTypes'

const initialState = {
  list: ['cat', 'sec', 'Raz'],
  current : 'Raz'
}

describe('categories reducer', () => {
  it('should handle initial state', () => {
    expect(
        categories(undefined, {})
    ).toEqual(initialState)
  })

  it('should add category', () => {
    expect(categories(undefined, {
          type: types.ADD_CATEGORY,
          text: 'Jest first category'
        })
      ).toEqual({
          current: "Raz", list: ["cat", "sec", "Raz", "Jest first category"]
          }
      )
  })

  it('should add duplicant category', () => {
      expect(categories(initialState, {
        type: types.ADD_CATEGORY,
        text: 'cat'
      })
    ).toEqual({
      current: "Raz", list: ["cat", "sec", "Raz", "cat"]
      }
    )
  })

  it('should add to an empty list of categories', () => {
      expect(categories({ list: [], current : ''
      }, {
        type: types.ADD_CATEGORY,
        text: 'one'
      })
    ).toEqual({ list: ['one'], current : ''})
  })

  it('should remove only category when its current', () => {
      expect(categories({categories: ['one'], currentCategory : 'one'}, 
      {
        type: types.REMOVE_CATEGORY,
        text: 'one'
      })
    ).toEqual({categories: [], currentCategory : ''}
    )
  })

  it('should remove only category when it isnt current', () => {
    let start =  {
        categories: ['one'],
        currentCategory : ''
      }
      expect(categories({categories: ['one'], currentCategory : ''}, 
      {
        type: types.REMOVE_CATEGORY,
        text: 'one'
      })
    ).toEqual({categories: [], currentCategory : ''}
    )
  })

  it.skip('should remove one category of many', () => {
    let start =  {
        categories: ['one', 'two', 'three'],
        locations: [],
        currentCategory : '',
        currentLocation : ''
      }
      expect(categories(start, {
        type: types.REMOVE_CATEGORY,
        text: 'two'
      })
    ).toEqual({
          categories: ['one', 'three'],
          locations: [],
          currentCategory : '',
          currentLocation : ''
        }
    )
  })

  it.skip('should completly remove duplicant category', () => {
    let start =  {
        categories: ['one', 'two', 'two', 'three', 'two'],
        locations: [],
        currentCategory : '',
        currentLocation : ''
      }
      expect(categories(start, {
        type: types.REMOVE_CATEGORY,
        text: 'two'
      })
    ).toEqual({
          categories: ['one', 'three'],
          locations: [],
          currentCategory : '',
          currentLocation : ''
        }
    )
  })

  it.skip('should view a first category ', () => {
    let start =  {
        categories: ['one', 'two', 'three', 'four'],
        locations: [],
        currentCategory : '',
        currentLocation : ''
      }
      expect(categories(start, {
            type: types.VIEW_CATEGORY,
            text: 'one'
        })
      ).toEqual({
            categories: ['one', 'two', 'three', 'four'],
            locations: [],
            currentCategory : 'one',
            currentLocation : ''
            }
        )
  })

  it.skip('should view a second category', () => {
    let start =  {
        categories: ['one', 'two', 'three', 'four'],
        locations: [],
        currentCategory : 'one',
        currentLocation : ''
      }
      expect(categories(start, {
            type: types.VIEW_CATEGORY,
            text: 'two'
        })
      ).toEqual({
            categories: ['one', 'two', 'three', 'four'],
            locations: [],
            currentCategory : 'two',
            currentLocation : ''
            }
        )
  })

  it.skip('should edit viewd category and change it in categories', () => {
    let start =  {
        categories: ['one', 'two', 'three', 'four'],
        locations: [],
        currentCategory : 'one',
        currentLocation : ''
      }
      expect(categories(start, {
            type: types.EDIT_CATEGORY,
            text: 'raz'
        })
      ).toEqual({
            categories: ['two', 'three', 'four', 'raz'],
            locations: [],
            currentCategory : 'raz',
            currentLocation : ''
            }
        )
  })

  it.skip('empty currentCategoey - viewd category should change and added to categories', () => {
    let start =  {
        categories: ['one', 'two', 'three', 'four'],
        locations: [],
        currentCategory : '',
        currentLocation : ''
      }
      expect(categories(start, {
            type: types.EDIT_CATEGORY,
            text: 'raz'
        })
      ).toEqual({
            categories: ['one', 'two', 'three', 'four', 'raz'],
            locations: [],
            currentCategory : 'raz',
            currentLocation : ''
            }
        )
  })
})