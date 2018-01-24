import locations from './locations'
import * as types from '../constants/ActionTypes'

const location = { Name : 'Raz', 
    Address : 'Mekor Chaim 66',
    Coordinates : '32.11,31.1',
    Category: 'Home'    
}

const emptyLocation = { 
  Name : '-', 
  Address : '-',
  Coordinates : '-',
  Category: '-'    
}

const initialState = {
    list: [],
    current : emptyLocation
  }

describe('locations reducer', () => {
  it('should handle initial state', () => {
    expect(
        locations(undefined, {})
    ).toEqual(initialState)
  })

  it('should add location', () => {
    expect(locations(undefined, {
          type: types.ADD_LOCATION,
          payload: location
        })
      ).toEqual({
            categories: [],
            locations: [{ Name : 'Raz', 
                Address : 'Mekor Chaim 66',
                Coordinates : '32.11,31.1',
                Category: 'Home'    
            }],
            currentCategory : '',
            currentLocation : ''
          }
      )
  })

  it('should add duplicant location', () => {
    expect(locations({  categories: [],
                        locations: [{ Name : 'Raz', 
                            Address : 'Mekor Chaim 66',
                            Coordinates : '32.11,31.1',
                            Category: 'Home'    
                        }], currentCategory : '', currentLocation : ''
            }, {
           type: types.ADD_LOCATION,
           payload: location
        })
      ).toEqual({
            categories: [],
            locations: [{ Name : 'Raz', 
                Address : 'Mekor Chaim 66',
                Coordinates : '32.11,31.1',
                Category: 'Home'    
            }, { Name : 'Raz', 
                Address : 'Mekor Chaim 66',
                Coordinates : '32.11,31.1',
                Category: 'Home'    
            }],
            currentCategory : '',
            currentLocation : ''
          }
      )
  })


  it('should add to a full list of location', () => {
    expect(locations({  categories: [],
                        locations: [{ Name : 'Vitali', 
                            Address : 'Derech Shlomo 66',
                            Coordinates : '33.51,31.3',
                            Category: 'Home'    
                        }], currentCategory : '', currentLocation : ''
            }, {
           type: types.ADD_LOCATION,
           payload: location
        })
      ).toEqual({
            categories: [],
            locations: [{ Name : 'Vitali', 
                Address : 'Derech Shlomo 66',
                Coordinates : '33.51,31.3',
                Category: 'Home'    
            }, { Name : 'Raz', 
                Address : 'Mekor Chaim 66',
                Coordinates : '32.11,31.1',
                Category: 'Home'    
            }],
            currentCategory : '',
            currentLocation : ''
          }
      )
  })

  it('should remove only location', () => {
    expect(locations({ categories: [], locations: [location],
                       currentCategory : '', currentLocation : ''
            }, {
          type: types.REMOVE_LOCATION,
          payload: location
        })
      ).toEqual({
            categories: [],
            locations: [],
            currentCategory : '',
            currentLocation : ''
          }
      )
  })

  it('should remove location from list', () => {
    expect(locations({ categories: [], locations: [location, {
                        Name : 'Vitali', 
                        Address : 'Derech Shlomo 66',
                        Coordinates : '33.51,31.3',
                        Category: 'Home'   
                    }], currentCategory : '', currentLocation : ''
            }, {
          type: types.REMOVE_LOCATION,
          payload: location
        })
      ).toEqual({
            categories: [],
            locations: [{
                Name : 'Vitali', 
                Address : 'Derech Shlomo 66',
                Coordinates : '33.51,31.3',
                Category: 'Home'  }],
            currentCategory : '',
            currentLocation : ''
          }
      )
    })


  it('view location when there is no current location ', () => {
    expect(locations({ categories: [], locations: [location], currentCategory : '', currentLocation : ''}, {
          type: types.VIEW_LOCATION,
          payload: location
        })
      ).toEqual({
            categories: [],
            locations: [location],
            currentCategory : '',
            currentLocation : location
          }
      )
    })

  // view when there is a current location
  it('should VIEW location and change currentLocation', () => {
    expect(locations({ categories: [], locations: [location, {
                        Name : 'Vitali', 
                        Address : 'Derech Shlomo 66',
                        Coordinates : '33.51,31.3',
                        Category: 'Home'   
                    }], currentCategory : '', currentLocation : location
            }, {
          type: types.VIEW_LOCATION,
          payload: {
                Name : 'Vitali', 
                Address : 'Derech Shlomo 66',
                Coordinates : '33.51,31.3',
                Category: 'Home'   
            }
        })
      ).toEqual({
            categories: [],
            locations: [location, {
                Name : 'Vitali', 
                Address : 'Derech Shlomo 66',
                Coordinates : '33.51,31.3',
                Category: 'Home'  }],
            currentCategory : '',
            currentLocation : {
                Name : 'Vitali', 
                Address : 'Derech Shlomo 66',
                Coordinates : '33.51,31.3',
                Category: 'Home'   
            }
          }
      )
    })

  it('view location when there is no current location ', () => {
    expect(locations({  list: [location], current : ''}, {
          type: types.EDIT_LOCATION,
          payload: location
        })
      ).toEqual({
            list: [location],
            current : location
          }
      )
    })


  // edit when there is no current location - add to locations array to
  it('view location when there is no current location ', () => {
    expect(locations({  list: [],current : ''}, {
          type: types.EDIT_LOCATION,
          payload: location
        })
      ).toEqual({
            list: [location],
            current : location
          }
      )
    })
})