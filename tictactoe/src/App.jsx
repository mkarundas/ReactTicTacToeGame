import { useState } from "react"

import GameBoard from "./components/Gameboard"
import Player from "./components/Player"


function App() {

  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectActivePlayer() {
    setActivePlayer((currActivePlayer)=> currActivePlayer === 'X' ? 'O' : 'X');
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer == "X"}/>
          <Player initialName="Player 2" symbol="0" isActive={activePlayer == "O"}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectActivePlayer} activePlayerSymbol={activePlayer}/>
      </div>
    </main>
  )
}

export default App
