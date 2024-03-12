import { useState } from "react";

import GameBoard from "./components/Gameboard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import {WINNING_COMBINATIONS} from "./winning-combinations.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  let currrntPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player == 'X') {
    currrntPlayer = 'O';
  }
  return currrntPlayer
}




function App() {

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = initialGameBoard;
  let winner;

  for(const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;
    gameBoard[row][col] = player;
  }

  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
      console.log("Winner !!!")
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;
 

  function handleSelectSquare(rowIndex, colIndex) {
      setGameTurns(preTurns=> {
      let currrntPlayer = deriveActivePlayer(preTurns);
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
        {(winner || hasDraw) && <GameOver winner={winner}/>}
        <GameBoard 
        onSelectSquare={handleSelectSquare} 
        board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
