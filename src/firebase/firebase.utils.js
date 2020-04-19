import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const config = {
    apiKey: "AIzaSyArc1oXwGtRFxlFyjuNP64J8Z85DVfInRY",
    authDomain: "crwn-db-35559.firebaseapp.com",
    databaseURL: "https://crwn-db-35559.firebaseio.com",
    projectId: "crwn-db-35559",
    storageBucket: "crwn-db-35559.appspot.com",
    messagingSenderId: "270977083816",
    appId: "1:270977083816:web:b514c772186c33fc7e559d",
    measurementId: "G-BGH21XNKDM"
  };

  firebase.initializeApp(config); 

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const createUserProfileDocument = async (userAuth, additionalData)=>{
        if(!userAuth) return;
        const userRef = firestore.doc(`users/${userAuth.uid}`);
        const snapShot = await userRef.get();
        if(!snapShot.exists){
            const {displayName, email} = userAuth;
            const createdAt = new Date();
            try{
                await userRef.set({
                   displayName,
                   email,
                   createdAt,
                   ...additionalData 
                })
            }catch(error){

            }
        }
        return userRef;
  }
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'})
  export const signInWithGoogle = ()=> auth.signInWithPopup(provider);
  export default firebase;