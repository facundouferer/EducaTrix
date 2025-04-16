import React from 'react';
import type { Fraction } from '../types/game';

interface FractionQuestionProps {
  fraction1: Fraction;
  fraction2: Fraction;
  onAnswer: (isCorrect: boolean) => void;
  disabled: boolean;
}

export const FractionQuestion: React.FC<FractionQuestionProps> = ({
  fraction1,
  fraction2,
  onAnswer,
  disabled
}) => {
  const handleChoice = (choosingFirst: boolean) => {
    const value1 = fraction1.numerator / fraction1.denominator;
    const value2 = fraction2.numerator / fraction2.denominator;
    const isCorrect = choosingFirst ? value1 > value2 : value2 > value1;
    onAnswer(isCorrect);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-center mb-4">¿Cuál fracción es mayor?</h2>
      
      <div className="flex justify-center items-center gap-8">
        <button
          onClick={() => handleChoice(true)}
          disabled={disabled}
          className="text-3xl font-bold p-4 rounded-lg hover:bg-blue-50 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="block text-center">{fraction1.numerator}</span>
          <div className="w-12 h-0.5 bg-black my-2"></div>
          <span className="block text-center">{fraction1.denominator}</span>
        </button>

        <span className="text-2xl">ó</span>

        <button
          onClick={() => handleChoice(false)}
          disabled={disabled}
          className="text-3xl font-bold p-4 rounded-lg hover:bg-blue-50 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="block text-center">{fraction2.numerator}</span>
          <div className="w-12 h-0.5 bg-black my-2"></div>
          <span className="block text-center">{fraction2.denominator}</span>
        </button>
      </div>
    </div>
  );
};