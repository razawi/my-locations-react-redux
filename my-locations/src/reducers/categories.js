import { ADD_CATEGORY, REMOVE_CATEGORY, EDIT_CATEGORY } from '../constants/ActionTypes'

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
      let id = state.categories.indexOf(action.text)
      let rcat = state.categories.filter(item => item !== action.text);
      return {
        categories : cat,
        locations : state.locations
      }

    // case EDIT_CATEGORY:
    //   return state.map(todo =>
    //     todo.id === action.id ?
    //       { ...todo, text: action.text } :
    //       todo
    //   )

    // case VIEW_CATEGORY:
    //   return state.map(todo =>
    //     todo.id === action.id ?
    //       { ...todo, text: action.text } :
    //       todo
    //   )
    default:
      return state
  }
}
