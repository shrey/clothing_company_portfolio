import React from 'react';
import {Route, Switch,Link} from 'react-router-dom';
import ShopPage from "./pages/shop/shop.component"
import HomePage from './pages/homepage/homepage.component';


function App() {
  return (
    
    <div className="App">
    <Switch>
        <Route exact path = "/" component = {HomePage}/>
        
        <Route exact path = "/shop" component = {ShopPage}/>
    </Switch>    
    </div>
  );
}

export default App;
