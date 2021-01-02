import React from 'react';
import './App.css';
import ChatScreen from './components/ChatScreen';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginScreen from './components/LoginScreen';

function App() {
  return (
    <Router>
      <Route path='/' exact component={ChatScreen} />
      <Route path='/test' exact component={LoginScreen} />
    </Router>
  );
}

export default App;
