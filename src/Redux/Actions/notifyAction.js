import { firebase } from '../../config/Firebase/Firebase'
let db = firebase.firestore()

const getNotification = (userUid) => {
    
    return (dispatch) => {
        db.collection('users').doc(userUid).onSnapshot((snapshot)=>{
                    dispatch({
                        type: "GET_NOTIFICATION",
                        notificationFlag: snapshot.data().notificationFlag,
                        notification : snapshot.data().notification
            
                    })    
                    dispatch({
                        type: "GET_NOTIFICATION",
                        notificationFlag: snapshot.data().notificationFlag,
                        notification : snapshot.data().notification
            
                    })     

        })
            
    }
   
}

export default getNotification