import React,{useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {createStructuredSelector} from "reselect"
import './App.css';
import {selectCurrentUser} from './redux/user/user.selectors'
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.action';
import CheckOutPage from './pages/checkout/checkout.component'
import {checkUserSession} from './redux/user/user.action'
import {selectIsLoading} from './redux/user/user.selectors'
import StateSpinner from './components/with-spinner/state_call_spinner'
const App = ({currentUser,checkUserSession,isLoading}) => {
  
  
  // componentDidMount() {
    
  //   const { setCurrentUser } = this.props;

  //   this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
  //     if (userAuth) {
  //       const userRef = await createUserProfileDocument(userAuth);

  //       userRef.onSnapshot(snapShot => {
  //         console.log(snapShot);
  //         setCurrentUser({
  //           id: snapShot.id,
  //           ...snapShot.data()
  //         });
  //       });
  //     }

  //     setCurrentUser(userAuth);//sets to null
      
  //   });
    
  // }
    useEffect(() => {
      checkUserSession();
    },[checkUserSession])

 
    return (
      <div>
        {

        isLoading? (<StateSpinner/>): 
        
          (<div>
          <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' 
          render={() =>currentUser ? 
          (<Redirect to = "/"/>)
          : (<SignInAndSignUpPage/>) }/>
          <Route exact path = '/checkout' component = {CheckOutPage}/>
        </Switch>
        
          </div>)
        }  
      </div>
    );
  }



const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
  
});
const mapStateToProps =createStructuredSelector ({
  currentUser: selectCurrentUser,
  isLoading: selectIsLoading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);