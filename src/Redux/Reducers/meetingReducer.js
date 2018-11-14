const reducer = (state = {name : []}, action) => {
    switch(action.type) {
        case "GET_MEETINGS": {

            
            return {...state, likedUsers : action.likedMeetingUsers}
        }
        default: {
            return state;
        }
    }
}

export default reducer