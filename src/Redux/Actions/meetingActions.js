import { firebase } from '../../config/Firebase/Firebase'
let db = firebase.firestore()

const gettingMeetingsHistory = (userUid) => {

    return (dispatch) => {
        db.collection('users').doc(userUid).onSnapshot((snapshot) => {
            if (snapshot.exists) {
                const {likedUsers = [], meetingRequests = []} = snapshot.data();
                    dispatch({
                        type: "GET_MEETINGS",
                        likedMeetingUsers: likedUsers,
                        meetingRequest : meetingRequests
                    })
            }

        })

    }

}

export default gettingMeetingsHistory