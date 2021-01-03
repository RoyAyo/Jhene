import React from 'react';
import './App.css';
import ChatScreen from './components/ChatScreen';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <Route path='/chat' exact component={ChatScreen} />
      <Route path='/test' exact component={LoginScreen} />
      <Route path='/' exact component={LandingPage} />
    </Router>
  );
}

export default App;
