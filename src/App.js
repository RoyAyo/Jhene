import React, {useState} from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';

function App() {

  const [viewChat, setViewChat] = useState(false);

  const changeView = () => {
    setViewChat(true);
  }

  return (
    <div className="App">
      {
        viewChat ? (
          <div>
            <h1>Hello world</h1>
          </div>
        ) : (
          <HomeScreen changeView={changeView}/>
        )
      }
    </div>
  );
}

export default App;
