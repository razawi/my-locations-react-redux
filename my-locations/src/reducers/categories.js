import { ADD_CATEGORY, REMOVE_CATEGORY, EDIT_CATEGORY } from '../constants/ActionTypes'

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]

const location = { Name : 'Raz', 
    Address : 'Mekor Chaim 66',
    Coordinates : '32.11,31.1',
    Category: 'Home'    
}
const categories =[]


export default function categories (state = initialState, action) {
  switch (action.type) {
    case ADD_CATEGORY:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        }
      ]

    case REMOVE_CATEGORY:
      return state.filter(todo =>
        todo.id !== action.id
      )

    case EDIT_CATEGORY:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, text: action.text } :
          todo
      )
    default:
      return state
  }
}
