import React from 'react';
import './App.css';

import NavBar from './components/NavBar';
import Title from './components/Title';
import InputBar from './components/InputBar';

class App extends React.Component {
  
  render() {
    return (
      <div className="main">
        <NavBar />
        <Title />
        <InputBar />
      </div>
    );
  }
}

export default App;
