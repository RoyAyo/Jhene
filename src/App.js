import React from 'react';
import ChatScreen from './components/ChatScreen';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import VendorForm from './components/VendorForm';
import Speech from './components/Speech';
import Error from './components/Error';

function App() {
  return (
    <Router>
      <Switch>
      <Route path='/' exact component={LandingPage} />
      <Route path='/register' exact component={Register} />
      <Route path='/vendor-form' exact component={VendorForm} />
      <Route path='/chat' exact component={ChatScreen} />
      <Route path='/speech' exact component={Speech} />
      <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
