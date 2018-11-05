import { firebase } from '../../config/Firebase/Firebase'
let db = firebase.firestore()

const getNotification = (userUid) => {
    
    return (dispatch) => {
        db.collection('users').doc(userUid).onSnapshot((snapshot)=>{
            if(snapshot.exists){
                console.log("SNAPSHOT" , snapshot.data().profilePicUrl);
                        dispatch({
                            type: "GET_NOTIFICATION",
                            notificationFlag: snapshot.data().notificationFlag,
                            notification : snapshot.data().notification,
                            profilePicUrl : snapshot.data().profilePicUrl
                
                        })    
                    }

        })
            
    }
   
}

export default getNotification