import React from 'react';
import './App.css';
import { Game } from './components/Game';

function App(): JSX.Element {
  return (
    <>
      <header>
        Life Game 🧬
      </header>
      <Game />
    </>
  );
}

export default App;
