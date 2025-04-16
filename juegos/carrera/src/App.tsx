import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { StartScreen } from './components/StartScreen';
import { RaceTrack } from './components/RaceTrack';
import { FractionQuestion } from './components/FractionQuestion';
import { generateDifferentFractions } from './utils/fractions';
import type { Player, GameState } from './types/game';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    currentPlayerIndex: 0,
    fraction1: { numerator: 0, denominator: 1 },
    fraction2: { numerator: 0, denominator: 1 },
    gameStarted: false,
    winner: null,
    totalRounds: 10
  });

  const [playCorrect] = useSound('/correct.mp3', { volume: 0.5 });
  const [playIncorrect] = useSound('/incorrect.mp3', { volume: 0.5 });

  useEffect(() => {
    if (gameState.gameStarted && !gameState.winner) {
      const [f1, f2] = generateDifferentFractions();
      setGameState(prev => ({ ...prev, fraction1: f1, fraction2: f2 }));
    }
  }, [gameState.currentPlayerIndex, gameState.gameStarted]);

  const handleGameStart = (players: Player[], rounds: number) => {
    const [f1, f2] = generateDifferentFractions();
    setGameState({
      players,
      currentPlayerIndex: 0,
      fraction1: f1,
      fraction2: f2,
      gameStarted: true,
      winner: null,
      totalRounds: rounds
    });
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      playCorrect();
    } else {
      playIncorrect();
    }

    setGameState(prev => {
      const updatedPlayers = [...prev.players];
      const currentPlayer = updatedPlayers[prev.currentPlayerIndex];
      const newPosition = isCorrect ? Math.min(prev.totalRounds, currentPlayer.position + 1) : currentPlayer.position;
      
      updatedPlayers[prev.currentPlayerIndex] = {
        ...currentPlayer,
        position: newPosition
      };

      const winner = newPosition >= prev.totalRounds - 1 ? currentPlayer : null;
      const nextPlayerIndex = (prev.currentPlayerIndex + 1) % prev.players.length;

      return {
        ...prev,
        players: updatedPlayers,
        currentPlayerIndex: winner ? prev.currentPlayerIndex : nextPlayerIndex,
        winner
      };
    });
  };

  if (!gameState.gameStarted) {
    return <StartScreen onGameStart={handleGameStart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <RaceTrack 
          players={gameState.players} 
          totalRounds={gameState.totalRounds} 
        />
        
        {gameState.winner ? (
          <div className="bg-white p-8 rounded-xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              ¡{gameState.winner.name} ha ganado!
            </h2>
            <button
              onClick={() => setGameState(prev => ({
                ...prev,
                gameStarted: false,
                winner: null
              }))}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
            >
              Jugar de nuevo
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white p-4 rounded-xl text-center">
              <h3 className="text-xl font-semibold">
                Turno de: {gameState.players[gameState.currentPlayerIndex].name}
              </h3>
            </div>
            
            <FractionQuestion
              fraction1={gameState.fraction1}
              fraction2={gameState.fraction2}
              onAnswer={handleAnswer}
              disabled={!!gameState.winner}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;