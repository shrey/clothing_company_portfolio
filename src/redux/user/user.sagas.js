import {takeLatest,put,all,call} from 'redux-saga/effects';
import UserActionTypes from './user.types';
import {auth,googleProvider,createUserProfileDocument,getCurrentUser} from '../../firebase/firebase.utils';
import {signInFailure,signInSuccess,signOutFailure, signOutSuccess,signUpFailure,signUpSuccess,toggleLoading} from './user.action'
import {clearCart} from '../cart/cart.action'


export function* getSnapshotFromUserAuth(userAuth){
  try {   
    const userRef = yield call(createUserProfileDocument,userAuth);
     
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data() 
    }))}
    catch(error){
        yield put(signInFailure(error));
    }
    
}
export function* isUserAuthenticated(){
    yield put(toggleLoading()); 
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
        yield put(toggleLoading());
     }catch(error){
         yield put(signInFailure(error))
     }
}
export function* signInWithGoogle(){
    try{
        const {user} = yield auth.signInWithPopup(googleProvider); 
        yield getSnapshotFromUserAuth(user);
    }catch(error){
        yield put(signInFailure(error));
    }
}
export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle) 
}

export function* signInWithEmail({payload: {email,password}}){
    console.log("it works");
    yield put(toggleLoading());
    try{
        
        const {user} = yield auth.signInWithEmailAndPassword(email,password);
        yield getSnapshotFromUserAuth(user);
        yield put(toggleLoading());
    }
    catch(error){
        yield put(signInFailure(error));
    }
}
export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,signInWithEmail);
}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION,isUserAuthenticated);
}
export function* signOut(){
    try{
        yield auth.signOut();
        yield put(signOutSuccess());
        
    }catch(error){
        yield put(signOutFailure(error));
    }
   
}
export function* onSignOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START,signOut);
}

export function* signUp({payload: {email,password,displayName}}){
try{
       console.log(email);
       console.log(password); 
       const {user} = yield auth.createUserWithEmailAndPassword(email,password);
        const userRef = yield createUserProfileDocument(user,{displayName});
        const userSnapshot = yield userRef.get();
        yield put(signUpSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }));
    
}catch(error){
    signUpFailure(error)
}
}
export function* onSignUpStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START,signUp)
}
export function* userSagas(){
    yield all([call(onGoogleSignInStart),call(onEmailSignInStart),call(onCheckUserSession),call(onSignOutStart),call(onSignUpStart)])
}
