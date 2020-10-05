import React, {useState} from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import ChatScreen from './components/ChatScreen';

function App() {

  const [viewChat, setViewChat] = useState(false);

  const changeView = () => {
    console.log('Yeah');
    setViewChat(true);
  }

  return (
    <div>
      {
        viewChat ? (
            <ChatScreen /> 
        ) : (
          <HomeScreen changeView={changeView} />
        )
      }
    </div>
  );
}

export default App;
