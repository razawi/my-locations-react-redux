import { ADD_CATEGORY, REMOVE_CATEGORY, EDIT_CATEGORY, VIEW_CATEGORY } from '../constants/ActionTypes'

const initialState = {
    categories: [],
    locations: [],
    currentCategory : '',
    currentLocation : ''
  }

const locationList = { Name : 'Raz', 
    Address : 'Mekor Chaim 66',
    Coordinates : '32.11,31.1',
    Category: 'Home'    
}
const categoryList =[]

export default function categories (state = initialState, action = {}) {

  switch (action.type) {
    case ADD_CATEGORY:
      return Object.assign({}, state, {
        categories : [...state.categories, action.text]
      });

    case REMOVE_CATEGORY:
      let filteredCat = state.categories.filter(item => item !== action.text);
      return Object.assign({}, state, {
        categories : filteredCat
      });
    case VIEW_CATEGORY:
      return Object.assign({}, state, {
        currentCategory : action.text
      });

    case EDIT_CATEGORY:
        let editedCat = state.categories.filter(item => item !== state.currentCategory);
        return Object.assign({}, state, {
            currentCategory : action.text,
            categories : [...editedCat, action.text]
        });

    default:
      return state
  }
}
