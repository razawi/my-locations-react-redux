import { combineReducers } from 'redux'
import categories from './categories'
import locations from './locations'
import uiActions from './uiActions'


const rootReducer = combineReducers({
    categories,
    locations,
    uiActions
})

export default rootReducer
