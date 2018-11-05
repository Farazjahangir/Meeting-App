const reducer = (state = {name : []}, action) => {
    switch(action.type) {
        case "GET_NOTIFICATION": {
            console.log("REDUCER" , action);
            
            return {...state, notificationFlag: action.notificationFlag , notification : action.notification , profilePicUrl : action.profilePicUrl}
        }
        default: {
            return state;
        }
    }
}

export default reducer