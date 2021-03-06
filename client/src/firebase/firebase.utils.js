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

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
      const collectionRef = firestore.collection(collectionKey);
      
      const batch = firestore.batch();
      objectsToAdd.forEach((obj =>{
          const newDocRef = collectionRef.doc();
          batch.set(newDocRef,obj);
      }))
      return await batch.commit();
      
  }
  export const convertCollectionsSnapshotToMap = (collections) =>{
    const transfromedCollection = collections.docs.map (doc => {
        const {title,items} = doc.data();  
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
    
    
    return transfromedCollection.reduce((accumulator,collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    },{});
  }
  export const getCurrentUser = () => {
      return new Promise((resolve,reject)=>{
          const unsubscribe = auth.onAuthStateChanged(userAuth =>{
              unsubscribe();
              resolve(userAuth);

          },reject
          )
      })
  }
  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt: 'select_account'})
  export const signInWithGoogle = ()=> auth.signInWithPopup(googleProvider);
  export default firebase;