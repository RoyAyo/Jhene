import React from 'react';
import './App.css';
import ChatScreen from './components/ChatScreen';
import {BrowserRouter as Router, Route} from 'react-router-dom';


function App() {

  // const [viewChat, setViewChat] = useState(false);

  // const changeView = () => {
  //   setViewChat(true);
  // }

  return (
    <Router>
      <Route path='/' exact component={ChatScreen} />
    </Router>
  );
}

export default App;
