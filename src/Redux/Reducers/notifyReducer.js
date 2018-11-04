const reducer = (state = {name : []}, action) => {
    switch(action.type) {
        case "GET_NOTIFICATION": {
            return {...state, notificationFlag: action.notificationFlag , notification : action.notification}
        }
        default: {
            return state;
        }
    }
}

export default reducer