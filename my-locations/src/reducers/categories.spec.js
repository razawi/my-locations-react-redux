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

  it('should add duplicant category', () => {
    let start =  {
        categories: ['start'],
        locations: [],
        currentCategory : '',
        currentLocation : ''
      }
      expect(categories(start, {
        type: types.ADD_CATEGORY,
        text: 'start'
      })
    ).toEqual({
          categories: ['start', 'start'],
          locations: [],
          currentCategory : '',
          currentLocation : ''
        }
    )
  })

  it('should add to full list of categories', () => {
    let start =  {
        categories: ['one', 'two', 'three'],
        locations: [],
        currentCategory : '',
        currentLocation : ''
      }
      expect(categories(start, {
        type: types.ADD_CATEGORY,
        text: 'four'
      })
    ).toEqual({
          categories: ['one', 'two', 'three', 'four'],
          locations: [],
          currentCategory : '',
          currentLocation : ''
        }
    )
  })

  it('should remove only category', () => {
    let start =  {
        categories: ['one'],
        locations: [],
        currentCategory : '',
        currentLocation : ''
      }
      expect(categories(start, {
        type: types.REMOVE_CATEGORY,
        text: 'one'
      })
    ).toEqual({
          categories: [],
          locations: [],
          currentCategory : '',
          currentLocation : ''
        }
    )
  })

  it('should remove one category of many', () => {
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

  it('should completly remove duplicant category', () => {
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

  it('should view a first category ', () => {
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

  it('should view a second category', () => {
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

  it('should edit viewd category and change it in categories', () => {
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

  it('empty currentCategoey - viewd category should change and added to categories', () => {
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