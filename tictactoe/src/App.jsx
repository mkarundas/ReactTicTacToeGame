import { useState } from "react";

import GameBoard from "./components/Gameboard";
import Player from "./components/Player";
import Log from "./components/Log";


function App() {

  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectActivePlayer(rowIndex, colIndex) {
    setActivePlayer((currActivePlayer)=> currActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(preTurns=> {
      let currrntPlayer = 'X';

      if(preTurns.length > 0 && preTurns[0].player == 'X') {
        currrntPlayer = 'O';
      }

      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: currrntPlayer},
        ...preTurns];

        return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer == "X"}/>
          <Player initialName="Player 2" symbol="0" isActive={activePlayer == "O"}/>
        </ol>
        <GameBoard 
        onSelectSquare={handleSelectActivePlayer} 
        turns={gameTurns}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
