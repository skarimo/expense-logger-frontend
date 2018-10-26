import React, { Component } from 'react';
import './App.css';
import Login from './containers/Login.js'
import Adapter from './adapter.js'

class App extends Component {



  render() {

    const URL = "https://expense-logger-backend.herokuapp.com/"
    const adapter = new Adapter(URL)

    return (
      <div className="App">
        <Login adapter={adapter}/>
      </div>
    );
  }
}

export default App;
