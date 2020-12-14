import React from 'react';
import './App.css';
import ChatScreen from './components/ChatScreen';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route path='/' exact component={ChatScreen} />
    </Router>
  );
}

export default App;
