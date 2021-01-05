import React from 'react';
import './App.css';
import ChatScreen from './components/ChatScreen';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import VendorForm from './components/VendorForm';

function App() {
  return (
    <Router>
      <Route path='/' exact component={LandingPage} />
      <Route path='/register' exact component={Register} />
      <Route path='/vendor-form' exact component={VendorForm} />
      <Route path='/chat' exact component={ChatScreen} />
      <Route path='/test' exact component={LoginScreen} />
    </Router>
  );
}

export default App;
