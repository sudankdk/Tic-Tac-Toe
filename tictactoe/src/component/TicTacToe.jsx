import { useEffect, useState } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";

const Player_X = "X";
const Player_O = "O";
const winningCombinations = [
  {
    combo: [0, 1, 2],
    strikeClass: "strike-row-1",
  },
  {
    combo: [3, 4, 5],
    strikeClass: "strike-row-2",
  },
  {
    combo: [6, 7, 8],
    strikeClass: "strike-row-3",
  },
  {
    combo: [0, 3, 6],
    strikeClass: "strike-column-1",
  },
  {
    combo: [1, 4, 7],
    strikeClass: "strike-column-2",
  },
  {
    combo: [2, 5, 8],
    strikeClass: "strike-column-3",
  },
  {
    combo: [0, 4, 8],
    strikeClass: "strike-diagonal-1",
  },
  {
    combo: [2, 4, 6],
    strikeClass: "strike-diagonal-2",
  },
];

function checkWinner(tiles, setStrikeClass, setGameState) {
  for (const { combo, strikeClass } of winningCombinations) {
    const tileValue1 = tiles[combo[0]];
    const tileValue2 = tiles[combo[1]];
    const tileValue3 = tiles[combo[2]];

    if (
      tileValue1 !== null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      setStrikeClass(strikeClass);
      if (tileValue1 === Player_X) {
        setGameState(GameState.playerXWins);
      } else {
        setGameState(GameState.playerOWins);
      }
      return;
    }
  }

  const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
  if (areAllTilesFilledIn) {
    setGameState(GameState.draw);
  }
}

const TicTacToe = () => {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(Player_X);
  const [strikeClass, setStrikeClass] = useState(null);
  const [gameState, setGameState] = useState(GameState.inProgress);

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
  }, [tiles]);

  const handleTileClick = (index) => {
    if (tiles[index] !== null || gameState !== GameState.inProgress) {
      return;
    }
    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    setPlayerTurn(playerTurn === Player_X ? Player_O : Player_X);
  };

  const handleReset = () => {
    setTiles(Array(9).fill(null));
    setPlayerTurn(Player_X);
    setStrikeClass(null);
    setGameState(GameState.inProgress);
  };

  return (
    <div>
      <h1>TicTacToe</h1>
      <Board
        playerTurn={playerTurn}
        tiles={tiles}
        onTileClick={handleTileClick}
        strikeClass={strikeClass}
      />
      <GameOver gameState={gameState} />
      <Reset gameState={gameState} onReset={handleReset} />
    </div>
  );
};

export default TicTacToe;
