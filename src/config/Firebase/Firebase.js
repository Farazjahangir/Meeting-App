// Initialize Firebase
import * as firebase from 'firebase'
var config = {
  apiKey: "AIzaSyDIdqxcaG3r22eBpexZRIABd1wdrq0xGdo",
  authDomain: "meeting-app1.firebaseapp.com",
  databaseURL: "https://meeting-app1.firebaseio.com",
  projectId: "meeting-app1",
  storageBucket: "meeting-app1.appspot.com",
  messagingSenderId: "563893950687"
};
firebase.initializeApp(config);
const db = firebase.firestore();
const storageRef = firebase.storage().ref()
let urls = []
let userUid;


firebase.auth().onAuthStateChanged(function(user) {
    userUid = user.uid;
    console.log("UID" , userUid);
});


const loginWithFirebase = () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  return new Promise((resolve,reject) => {
    firebase.auth().signInWithPopup(provider).then(function (result) {
      resolve(result)
    }).catch(function (error) {
      console.log(error);
  
    });
  })
}


const profileSaveToFirebase = async (data) => {
    for(var i =0; i < data.imgUrls.length; i++){
      let name = `${Date.now()} - ${userUid}`
      let message = data.imgUrls[i]
      await storageRef.child(name).putString(message, 'data_url')
      const url = await storageRef.child(name).getDownloadURL();
      console.log("url -->", url)
      urls.push(url)
    }

    console.log("data.coords -->", data.coords)

    return new Promise((resolve , reject)=>{
      db.collection("Users").doc(userUid).set({
        Nickname : data.nickName,
        ContactNumber : data.contactNum,
        Bevarages : data.bevarages,
        MeetingTime : data.meetingTime,
        Coords : data.coords,
        UserImages : urls
      }).then((result)=>{
        resolve(result)
      }).catch((err)=>{
          console.log(err);
          
      })
    })

}

export {
  loginWithFirebase,
  profileSaveToFirebase
}
