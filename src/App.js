import React from 'react';
import './App.css';

import Game from './components/Game';
import GameList from './components/GameList';

import {BrowserRouter,Routes,Route} from 'react-router-dom'

const App = () => {
  
  return (
    <div>
    <Game />
    <GameList />
    </div>
  );
};


export default App;
