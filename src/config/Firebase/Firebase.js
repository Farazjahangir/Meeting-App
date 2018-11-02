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
let urls = [];



// facebook login function
const loginWithFirebase = () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithPopup(provider).then(function (result) {
      resolve(result)
    })
  })
}

// facebook logout function
const logOut = () =>{
  return new Promise((resolve , reject)=>{
    firebase.auth().signOut().then(function() {
     resolve()
    })
  })
}

// function to save user profile
const profileSaveToFirebase = async (data) => {
  // getting current user uid
  const userUid = firebase.auth().currentUser.uid;

  for (var i = 0; i < data.imgUrls.length; i++) {
    let name = `${Date.now()} - ${userUid}`
    let message = data.imgUrls[i]
    await storageRef.child(name).putString(message, 'data_url')
    const url = await storageRef.child(name).getDownloadURL();
    urls.push(url)
  }

  // saving profile to db
  return new Promise((resolve, reject) => {
    db.collection("users").doc(userUid).set({
      Nickname: data.nickName,
      ContactNumber: data.contactNum,
      Bevarages: data.bevarages,
      MeetingTime: data.meetingTime,
      Coords: data.coords,
      UserImages: urls,
      userUid
    }).then((result) => {
      resolve(result)
    }).catch((err) => {
      console.log(err);

    })
  })

}

// checking user profile
const checkingUser = () => {
  const userUid = firebase.auth().currentUser.uid;
  return new Promise((resolve, reject) => {
    var docRef = db.collection("users").doc(userUid);
    docRef.get()
    // if exist
    .then(function (doc) {
      resolve(doc)
    })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

  })
}

// getting current user data
const getUserData = () => {

  const userUid = firebase.auth().currentUser.uid;
  console.log("current user -->", firebase.auth().currentUser);
  return new Promise((resolve, reject) => {
    db.collection("users").doc(userUid).get().then((doc) => {
      resolve(doc.data())
    })
  })
}

// getting other users
const getOtherUsers = (data) => {
  const usersArr = [] //empty array to save users
  const bevrages = data.Bevarages // current user bev
  const meetingTime = data.MeetingTime // current user meetingTimes
  const matchedUsers = [] // to save matched users

  return new Promise((resolve , reject)=>{

    db.collection("users").get().then(function (querySnapshot) {
      const userUid = firebase.auth().currentUser.uid;
      querySnapshot.forEach(function (doc) {
        if (doc.id === userUid) return
        usersArr.push(doc.data())
        
      });
      
      usersArr.forEach((user)=>{
        let isBev = false
        let isTime = false
          user.Bevarages.forEach((bev) => {
            if (bevrages.includes(bev)) isBev = true           
          })
        
          user.MeetingTime.forEach((time) => {
            if (meetingTime.includes(time)) isTime = true          
          })
    
          if(isBev && isTime){
            matchedUsers.push(user)  
            resolve(matchedUsers)
          }
      })  
    })
  })
  
}


const savingLikedUserData = (data) =>{
  let likedUserArr
  console.log(data);
  
  const userUid = firebase.auth().currentUser.uid;
  db.collection('users').doc(userUid).get()
  .then((doc)=>{
    
    if(doc.data().likedUsers){
      likedUserArr = doc.data().likedUsers
      likedUserArr.unshift(data.userUid)
      db.collection('users').doc(userUid).update({
          likedUsers : likedUserArr
      })
    }
    else{
      likedUserArr = []
      likedUserArr.push(data.userUid)
      db.collection('users').doc(userUid).update({
        likedUsers : likedUserArr
    })
    }
    
  })
  
  

}

export {
  firebase,
  loginWithFirebase,
  logOut,
  profileSaveToFirebase,
  checkingUser,
  getUserData,
  getOtherUsers,
  savingLikedUserData
}