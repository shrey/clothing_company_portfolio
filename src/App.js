import React from 'react';
import {Route, Switch,Link} from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';

const RandomPage = (props) =>{
  console.log(props);
  return(
    <div>
      <h1>{props.match.params.word} Page</h1>
    </div>
  )
}
function App() {
  return (
    
    <div className="App">
    <Switch>
        <Route exact path = "/" component = {HomePage}/>
        <Route path = "/:word" component = {RandomPage}/>
        
    </Switch>    
    </div>
  );
}

export default App;
