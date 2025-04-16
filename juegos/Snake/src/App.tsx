import React, { useState } from 'react';
import GameSetup from './components/GameSetup';
import Game from './components/Game';
import { GameMode } from './types';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [multiplier, setMultiplier] = useState<number | null>(null);

  const handleStartGame = (mode: GameMode, mult?: number) => {
    setGameMode(mode);
    setMultiplier(mult || null);
    setGameStarted(true);
  };

  const handleGameOver = () => {
    setGameStarted(false);
    setGameMode(null);
    setMultiplier(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {!gameStarted ? (
        <GameSetup onStartGame={handleStartGame} />
      ) : (
        <Game mode={gameMode!} multiplier={multiplier} onGameOver={handleGameOver} />
      )}
    </div>
  );
}

export default App;