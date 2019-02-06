import React, { Component } from 'react';
import LoginPage from './components/LoginPage';

import './App.css';

class App extends Component {
  render() {
    console.log(this.props.history);
    return (
      <LoginPage history={this.props.history}/>
    );
  }
}

export default App;
