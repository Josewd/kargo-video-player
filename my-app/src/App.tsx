import React from 'react';

// Style
import './App.css';

// Components
import { Player } from './components/Player/Player';

// Assets
import kargoLogo from './assets/Kargo+Logo.png';

function App() {
  return (
    <div className="App">
      <nav className='Nav'>
        <img className='Logo' src={kargoLogo} alt="Kargo logo" />
      </nav>
      <Player url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
    </div>
  );
}

export default App;

