import React from 'react';
import './App.css';
import ChatScreen from './components/ChatScreen';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route path='/' exact component={ChatScreen} />
      <Route path='/check' exact component={<div>Hello world</div>} />
    </Router>
  );
}

export default App;
