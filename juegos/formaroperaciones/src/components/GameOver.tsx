import React from 'react';
import { Trophy } from 'lucide-react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-8">
      <div className="bg-white/90 rounded-2xl p-12 backdrop-blur-lg shadow-xl text-center max-w-md w-full">
        <Trophy className="w-24 h-24 mx-auto mb-6 text-yellow-500" />
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Game Over!</h1>
        <p className="text-2xl mb-8 text-gray-600">Final Score: {score}</p>
        <button
          onClick={onRestart}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};