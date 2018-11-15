const reducer = (state = {name : []}, action) => {
    switch(action.type) {
        case "GET_MEETINGS": {
            
            return {...state, likedUsers : action.likedMeetingUsers , meetingRequest : action.meetingRequest}
        }
        default: {
            return state;
        }
    }
}

export default reducer