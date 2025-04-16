import React, { useState, useEffect } from 'react';
import { Heart, RefreshCw } from 'lucide-react';
import { DragCard } from './components/DragCard';
import { DropZone } from './components/DropZone';
import { GameOver } from './components/GameOver';
import { generateLevel } from './utils/gameLogic';
import type { Card } from './types';

function App() {
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<Card[]>([]);
  const [solution, setSolution] = useState<number>(0);
  const [placedCards, setPlacedCards] = useState<(Card | null)[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    startNewLevel();
  }, [level]);

  const startNewLevel = () => {
    const { cards: newCards, solution: newSolution } = generateLevel(level);
    setCards(newCards);
    setSolution(newSolution);
    setPlacedCards(Array(5).fill(null));
  };

  const handleDrop = (index: number, card: Card) => {
    const newPlacedCards = [...placedCards];
    newPlacedCards[index] = card;
    setPlacedCards(newPlacedCards);

    if (newPlacedCards.every(card => card !== null)) {
      checkSolution(newPlacedCards);
    }
  };

  const checkSolution = (cards: (Card | null)[]) => {
    const expression = cards.map(card => card?.value).join('');
    try {
      // eslint-disable-next-line no-eval
      const result = eval(expression.split('=')[0]);
      const expectedResult = Number(expression.split('=')[1]);

      if (result === expectedResult) {
        setScore(score + 100 * level);
        setLevel(level + 1);
        playSound('success');
      } else {
        handleWrongAnswer();
      }
    } catch {
      handleWrongAnswer();
    }
  };

  const handleWrongAnswer = () => {
    setLives(lives - 1);
    playSound('error');
    if (lives <= 1) {
      setIsGameOver(true);
    } else {
      setTimeout(startNewLevel, 1000);
    }
  };

  const playSound = (type: 'success' | 'error') => {
    const audio = new Audio(
      type === 'success'
        ? 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'
        : 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3'
    );
    audio.play().catch(() => {});
  };

  const resetGame = () => {
    setLives(3);
    setScore(0);
    setLevel(1);
    setIsGameOver(false);
    startNewLevel();
  };

  if (isGameOver) {
    return <GameOver score={score} onRestart={resetGame} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            {[...Array(lives)].map((_, i) => (
              <Heart
                key={i}
                className="w-8 h-8 text-red-500 drop-shadow-lg"
                fill="currentColor"
              />
            ))}
          </div>
          <div className="text-white text-xl font-bold">Score: {score}</div>
          <button
            onClick={resetGame}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <RefreshCw className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="bg-white/90 rounded-2xl p-8 backdrop-blur-lg shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Level {level}: Make {solution}
          </h1>

          <div className="flex justify-center gap-4 mb-12">
            {placedCards.map((card, index) => (
              <DropZone
                key={index}
                onDrop={(card) => handleDrop(index, card)}
                card={card}
              />
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {cards.map((card, index) => (
              <DragCard key={index} card={card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;