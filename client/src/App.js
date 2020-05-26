import React from 'react';
import Register from './screens/Register';
import Login from './screens/Login';
import Portfolio from './screens/Portfolio';
import Transactions from './screens/Transactions';
import './App.css';

function App() {
  return (
    <div className="App">
      <Register />
      <Login />
      <Portfolio />
      <Transactions />
    </div>
  );
}

export default App;
