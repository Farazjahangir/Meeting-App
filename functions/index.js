const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendNotification = functions.firestore.document('users/{userId}')
.onUpdate((change,context) => {
    console.log("CHANGE" , change.after.data().likedUsers);
    console.log("CONTEXT" , context.params.userId);
    
    const receiverId = change.after.data().likedUsers[0].likedUserId;
    const senderId = context.params.userId;
    const name = change.after.data().Nickname;
    const payload = {
        notification: {
            title: `${name} Wants To Meet You`,
        }
    }
    console.info(receiverId);
    console.info(senderId);
    console.info(name);            
    return admin.firestore().collection('users').doc(receiverId).get()
    .then((snapshot) => {
        const data = snapshot.data();
        const token = data.userToken;
        console.info(data)        
        console.info(token)
        return admin.messaging().sendToDevice(token, payload);
    });

})