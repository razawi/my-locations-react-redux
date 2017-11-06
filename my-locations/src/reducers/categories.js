import { ADD_CATEGORY, REMOVE_CATEGORY, EDIT_CATEGORY, VIEW_CATEGORY } from '../constants/ActionTypes'

const initialState = {
  list: ['cat', 'sec', 'Raz'],
  current : 'Raz'
}

export default function categories (state = initialState, action = {}) {
  switch (action.type) {
    case ADD_CATEGORY:
      return Object.assign({}, state, {
        list : [...state.list, action.text]
      });

    case REMOVE_CATEGORY:
      let filteredCat = state.list.filter(item => item !== action.text);
      return Object.assign({}, state, {
        list : filteredCat
      });
    case VIEW_CATEGORY:
      return Object.assign({}, state, {
        current : action.text
      });

    case EDIT_CATEGORY:
        let editedCat = state.list.filter(item => item !== state.current);
        return Object.assign({}, state, {
          current : action.text,
          list : [...editedCat, action.text]
        });

    default:
      return state
  }
}
