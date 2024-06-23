import React from "react";
import GameState from "./GameState";

const GameOver = ({ gameState }) => {
  let message;
  if (gameState === GameState.playerXWins) {
    message = "Player X Wins!";
  } else if (gameState === GameState.playerOWins) {
    message = "Player O Wins!";
  } else if (gameState === GameState.draw) {
    message = "It's a Draw!";
  } else {
    message = null;
  }

  return <div className="game-over">{message && <h2>{message}</h2>}</div>;
};

export default GameOver;
