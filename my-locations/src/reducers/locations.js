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

const initialState = {
    list: [initialLocation],
    current : initialLocation,
    menueView: "GROUPED"
  }

export default function locations (state = initialState, action = {}) {
  const type = action.type
  const location = action.payload

  switch (type) {
    case ADD_LOCATION:
      return Object.assign({}, state, {
        locations : [...state.locations, location]
      });

    case REMOVE_LOCATION:
      let filteredLoc = state.locations.filter(item => item !== action.payload);
      return Object.assign({}, state, {
        locations : filteredLoc
      });

    case VIEW_LOCATION:
      return Object.assign({}, state, {
        currentLocation : action.payload
      });

    case EDIT_LOCATION:
        let editedLoc = state.categories.filter(item => item !== state.currentLocation);
        return Object.assign({}, state, {
            currentLocation : action.payload,
            locations : [...editedLoc, action.payload]
        });

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
