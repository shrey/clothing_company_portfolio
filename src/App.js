import React from 'react';
import {Route, Switch,Link} from 'react-router-dom';
import ShopPage from "./pages/shop/shop.component"
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component'
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {auth, createUserProfileDocument } from './firebase/firebase.utils'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: null
    }
  }
  unsubscribeFromAuth = null
  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        console.log(userRef);
        userRef.onSnapshot(snapShot =>{
          console.log(snapShot)
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          },()=>{console.log(this.state.currentUser)})
        })
      }
    else{
      this.setState({currentUser:userAuth})
    }
    })
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render(){
  return (
    
    <div className="App">
    <Header currentUser = {this.state.currentUser} />
    <Switch>
        <Route exact path = "/" component = {HomePage}/>
        
        <Route exact path = "/shop" component = {ShopPage}/>

        <Route exact path = "/signin" component = {SignInAndSignUpPage}/>
    </Switch> 
     
    </div>
  );
}
}
export default App;
