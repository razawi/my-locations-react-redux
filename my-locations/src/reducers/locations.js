import { ADD_LOCATION, REMOVE_LOCATION, EDIT_LOCATION, VIEW_LOCATION,
  GROUP_MENUE, UNGROUP_MENUE, FILTER_MENUE } from '../constants/ActionTypes'

const initialLocation = { 
  Name : 'Dizengoff Center', 
  Address : 'Dizengof 92',
  position: {
    lat: 30.73,
    lng: 29.42,
  },
  Category: 'Tel aviv'    
}

const secondLocation = { 
  Name : 'Migdal shalom', 
  Address : 'Hertzel 1',
  position: {
    lat: 32.0640482,
    lng: 34.7674225,
  },
  Category: 'Tel aviv'    
}

const thirddLocation = { 
  Name : 'Fake location', 
  Address : 'neverland',
  position: {
    lat: 30.04,
    lng: 34.02,
  },
  Category: 'Jerusalem'    
}

const initialState = {
    list: [initialLocation, secondLocation, thirddLocation],
    current : initialLocation,
    menueView: "GROUPED"
  }

export default function locations (state = initialState, action = {}) {
  const type = action.type
  const location = action.payload

  switch (type) {
    case ADD_LOCATION:
      var v = Object.assign({}, state, {
        list : [...state.list, JSON.parse(JSON.stringify(location.location)) ],
        current: JSON.parse(JSON.stringify(location.location))
      });
      return v;

    case REMOVE_LOCATION:
      const emptyLocation  = { 
        Name : '', 
        Address : '',
        position: {
          lat: 0,
          lng: 0,
        },
        Category: ''    
      }
      
      var filteredLoc = state.list.filter(item => item !== state.current);
      var newCurrent = filteredLoc[0] || emptyLocation

      return Object.assign({}, state, {
        list : filteredLoc,
        current: newCurrent
      });

    case VIEW_LOCATION:  
      const newLocation = state.list.filter(loc => loc.Name === action.payload.locationName) 
      
      return Object.assign({}, state, {
        current : newLocation[0]
      });

    case EDIT_LOCATION:

      var editedLoc = state.list.filter(item => item !== state.current);
      var v = Object.assign({}, state, {
          current : action.payload.location,
          list : [...editedLoc, action.payload.location]
      });
      return v;

    case GROUP_MENUE:
      return Object.assign({}, state, {
        menueView : "GROUPED"
      });

    case UNGROUP_MENUE:
      return Object.assign({}, state, {
        menueView : "UNGROUPED"
      });

    case FILTER_MENUE:
      return Object.assign({}, state, {
        menueView : "FILTERED"
      });
    default:
      return state
  }
}
