import React, { useState, useEffect } from 'react';
import { Check, X, RefreshCw } from 'lucide-react';

type Operation = '+' | '-' | '*' | '/';
type GameState = {
  num1: number;
  num2: number;
  operation: Operation;
  options: number[];
  correctAnswer: number;
};

function App() {
  const [score, setScore] = useState(0);
  const [totalOperations, setTotalOperations] = useState(0);
  const [showResult, setShowResult] = useState<boolean | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [finalOperations, setFinalOperations] = useState(0);

  const generateProblem = () => {
    const operations: Operation[] = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1: number, num2: number, correctAnswer: number;

    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        correctAnswer = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * num1) + 1;
        correctAnswer = num1 - num2;
        break;
      case '*':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 * num2;
        break;
      case '/':
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = Math.floor(Math.random() * 10) + 1;
        num1 = num2 * correctAnswer;
        break;
      default:
        num1 = 0;
        num2 = 0;
        correctAnswer = 0;
    }

    // Generate wrong options
    const options = [correctAnswer];
    while (options.length < 4) {
      const wrongAnswer = correctAnswer + (Math.floor(Math.random() * 10) - 5);
      if (!options.includes(wrongAnswer) && wrongAnswer >= 0) {
        options.push(wrongAnswer);
      }
    }

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    return {
      num1,
      num2,
      operation,
      options,
      correctAnswer,
    };
  };

  useEffect(() => {
    setGameState(generateProblem());
  }, []);

  const handleAnswer = (selectedAnswer: number) => {
    if (gameState) {
      const isCorrect = selectedAnswer === gameState.correctAnswer;
      setShowResult(isCorrect);
      setTotalOperations(prev => prev + 1);
      
      if (isCorrect) {
        setScore(score + 1);
      } else {
        setFinalScore(score);
        setFinalOperations(totalOperations + 1);
        setShowGameOver(true);
        setScore(0);
        setTotalOperations(0);
      }

      setTimeout(() => {
        setShowResult(null);
        setGameState(generateProblem());
      }, 1500);
    }
  };

  const getOperationSymbol = (op: Operation) => {
    switch (op) {
      case '+': return '+';
      case '-': return '−';
      case '*': return '×';
      case '/': return '÷';
    }
  };

  const handleGameOverClose = () => {
    setShowGameOver(false);
    setGameState(generateProblem());
  };

  if (!gameState) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {showGameOver ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">¡Juego Terminado!</h2>
            <div className="bg-red-50 rounded-xl p-6 mb-6">
              <p className="text-xl text-gray-800 mb-2">
                Respondiste <span className="font-bold">{finalOperations}</span> operaciones
              </p>
              <p className="text-xl text-gray-800">
                Tu puntuación final: <span className="font-bold">{finalScore}</span> puntos
              </p>
            </div>
            <button
              onClick={handleGameOverClose}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xl font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              Empezar Nuevo Juego
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Juego de Matemáticas!</h1>
              <p className="text-lg text-gray-600">Puntuación: {score}</p>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 mb-8">
              <div className="text-4xl font-bold text-center text-gray-800">
                {gameState.num1} {getOperationSymbol(gameState.operation)} {gameState.num2} = ?
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {gameState.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-xl font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105"
                >
                  {option}
                </button>
              ))}
            </div>

            {showResult !== null && (
              <div className={`mt-6 text-center ${showResult ? 'text-green-500' : 'text-red-500'}`}>
                <div className="flex items-center justify-center text-2xl font-bold">
                  {showResult ? (
                    <>
                      <Check className="w-8 h-8 mr-2" />
                      ¡Correcto!
                    </>
                  ) : (
                    <>
                      <X className="w-8 h-8 mr-2" />
                      ¡Inténtalo de nuevo!
                    </>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={() => setGameState(generateProblem())}
              className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Nueva Operación
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;