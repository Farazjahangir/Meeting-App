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


const profileSaveToFirebase = (data) => {
  
  return new Promise ((resolve , reject)=>{
    for(var i =0; i < data.imgUrls.length; i++){
      let name = `${Date.now()} - ${i}`
      let message = data.imgUrls[i]
      console.log("IMAGES" , message);
      storageRef
        .child(name)
        .putString(message, 'data_url')
          .then(()=>{
            storageRef
            .child(name)
            .getDownloadURL()
              .then((url)=>{
                urls.push(url)
                console.log("URL" , urls);
                
              })
          })
    }
  })

}

export {
  loginWithFirebase,
  profileSaveToFirebase
}
