import categories from './categories'
import * as types from '../constants/ActionTypes'

const initialState = {
  list: ['Tel aviv', 'Jerusalem', 'Haifa'],
  current : 'Tel aviv'
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
          current: initialState.current, list: [...initialState.list, "Jest first category"]
          }
      )
  })

  it('should add duplicant category', () => {
      expect(categories(initialState, {
        type: types.ADD_CATEGORY,
        text: 'Jerusalem'
      })
    ).toEqual({
      current: initialState.current, list: [...initialState.list, "Jerusalem"]
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
      expect(categories({list: ['one'], current : 'one'}, 
      {
        type: types.REMOVE_CATEGORY,
        text: 'one'
      })
    ).toEqual({list: [], current : ''}
    )
  })

  it('should remove only category when it isnt current', () => {
    let start =  {
        list: ['one'],
        currentCategory : ''
      }
      expect(categories({list: ['one'], current : ''}, 
      {
        type: types.REMOVE_CATEGORY,
        text: 'one'
      })
    ).toEqual({list: [], current : ''}
    )
  })

  it('should remove one category of many', () => {
    let start =  {
        list: ['one', 'two', 'three'],
        current: ''
      }
      expect(categories(start, {
        type: types.REMOVE_CATEGORY,
        text: 'two'
      })
    ).toEqual({
          list: ['one', 'three'],
          current : ''
        }
    )
  })

  it('should completly remove duplicant category', () => {
    let start =  {
        list: ['one', 'two', 'two', 'three', 'two'],
        current : '',
      }
      expect(categories(start, {
        type: types.REMOVE_CATEGORY,
        text: 'two'
      })
    ).toEqual({
          list: ['one', 'three'],
          current : '',
        }
    )
  })

  it('should view a first category ', () => {
    let start =  {
        list: ['one', 'two', 'three', 'four'],
        current : '',
      }
      expect(categories(start, {
            type: types.VIEW_CATEGORY,
            text: 'one'
        })
      ).toEqual({
            list: ['one', 'two', 'three', 'four'],
            current : 'one'
            }
        )
  })

  it('should view a second category', () => {
    let start =  {
        list: ['one', 'two', 'three', 'four'],
        current : 'one',
      }
      expect(categories(start, {
            type: types.VIEW_CATEGORY,
            text: 'two'
        })
      ).toEqual({
            list: ['one', 'two', 'three', 'four'],
            current : 'two'
        })
  })

  it('should edit viewd category and change it in categories', () => {
    let start =  {
        list: ['one', 'two', 'three', 'four'],
        current : 'one'
      }
      expect(categories(start, {
            type: types.EDIT_CATEGORY,
            text: 'raz'
        })
      ).toEqual({
            list: ['two', 'three', 'four', 'raz'],
            current : 'raz'
        })
  })

  it('empty currentCategoey - viewd category should change and added to categories', () => {
    let start =  {
        list: ['one', 'two', 'three', 'four'],
        current : ''
      }
      expect(categories(start, {
            type: types.EDIT_CATEGORY,
            text: 'seven'
        })
      ).toEqual({
            list: ['one', 'two', 'three', 'four', 'seven'],
            current : 'seven'
        })
  })
})