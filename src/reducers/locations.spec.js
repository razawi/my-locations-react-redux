import locations from './locations'
import * as types from '../constants/ActionTypes'

const initialLocation = { 
  Name : 'Dizengoff Center', 
  Address : 'Dizengof 92',
  position: {
    lat: 30.73,
    lng: 29.42
  },
  Category: 'Tel aviv'    
}

const secondLocation = { 
  Name : 'Migdal shalom', 
  Address : 'Hertzel 1',
  position: {
    lat: 32.06,
    lng: 34.76
  },
  Category: 'Tel aviv'    
}

const thirdLocation = { 
  Name : 'Fake location', 
  Address : 'neverland',
  position: {
    lat: 30.04,
    lng: 34.02
  },
  Category: 'Jerusalem'    
}

const initialState = {
  list: [initialLocation, secondLocation],
  current : initialLocation,
  menueView: "GROUPED"
}

  // ======

describe('locations reducer', () => {
  it('should handle initial state', () => {
    expect(
      locations(undefined, {})
    ).toEqual(initialState)
  })

  it('should add location', () => {
    expect(
      locations(undefined, {
          type: types.ADD_LOCATION,
          payload: {location : thirdLocation}
        })
      ).toEqual({
        list: [...initialState.list, thirdLocation],
        current : thirdLocation,
        menueView: "GROUPED"
      })
  })

  it('should add duplicant location', () => {
    expect(locations(initialState, {
           type: types.ADD_LOCATION,
           payload: {location : secondLocation}
        })
      ).toEqual({
        list: [...initialState.list, secondLocation],
        current : secondLocation,
        menueView: "GROUPED"
      })
  })


it('should add to a full list of location', () => {
    expect(locations(initialState, {
          type: types.ADD_LOCATION,
          payload: {location : thirdLocation}
      })
    ).toEqual({
      list: [...initialState.list, thirdLocation],
      current : thirdLocation,
      menueView: "GROUPED"
    })
})

// todo - why is this undefined?
  it.skip('should remove location', () => {
    expect(locations(initialState, {
          type: types.REMOVE_LOCATION
        })
      ).toEqual({
        list: [initialState.secondLocation],
        current : initialState.secondLocation,
        menueView: "GROUPED"
      })
  })

  it.skip('should remove location from list', () => {
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


  it.skip('view location when there is no current location ', () => {
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
  it.skip('should VIEW location and change currentLocation', () => {
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

  it.skip('view location when there is no current location ', () => {
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
  it.skip('view location when there is no current location ', () => {
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