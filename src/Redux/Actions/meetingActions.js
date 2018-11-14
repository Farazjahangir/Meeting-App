import { firebase } from '../../config/Firebase/Firebase'
let db = firebase.firestore()

const gettingMeetingsHistory = (userUid) => {
    
    return (dispatch) => {
        db.collection('users').doc(userUid).onSnapshot((snapshot)=>{
            if(snapshot.exists){
                        dispatch({
                            type: "GET_MEETINGS",
                            likedMeetingUsers : snapshot.data().likedUsers
                
                        })    
                    }

        })
            
    }
   
}

export default gettingMeetingsHistory