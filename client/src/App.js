import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Result from './components/Result';
import Contact from './components/Contact';

class App extends React.Component {
  
  render() {
    return (
        <BrowserRouter>
          <NavBar />
          <Route exact path="/" component={Home}/>
          <Route path="/results" component={Result}/>
          <Route path="/contact" component={Contact}/>
          {/* <Route path="/about" component={About} /> */}
        </ BrowserRouter>
    );
  }
}

export default App;
