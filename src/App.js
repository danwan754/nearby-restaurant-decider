import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Result from './components/Result';

class App extends React.Component {
  
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <div className="routes">
          <Route exact path="/" component={Home}/>
          <Route path="/results" component={Result}/>
        </div>
      </ BrowserRouter>
    );
  }
}

export default App;
