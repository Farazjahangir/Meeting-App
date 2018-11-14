import { combineReducers } from 'redux'
import notifyReducer from './Reducers/notifyReducer'
import meetingReducer from './Reducers/meetingReducer'

export default combineReducers({
    notifyReducer,
    meetingReducer
})