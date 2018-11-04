import { combineReducers } from 'redux'
import authReducer from './Reducers/authReducer'
import notifyReducer from './Reducers/notifyReducer'

export default combineReducers({
    authReducer,
    notifyReducer
})