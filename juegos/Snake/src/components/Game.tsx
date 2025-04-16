import React, { useState, useEffect, useCallback } from 'react';
import { GameMode } from '../types';

interface GameProps {
  mode: GameMode;
  multiplier: number | null;
  onGameOver: () => void;
}

type Position = {
  x: number;
  y: number;
};

type Food = {
  position: Position;
  value: number;
  createdAt: number;
};

const GRID_SIZE = 20;
const CELL_SIZE = 25;
const INITIAL_SNAKE_LENGTH = 3;
const GAME_SPEED = 150;
const FOOD_DURATION = 5000; // 5 seconds in milliseconds

function Game({ mode, multiplier, onGameOver }: GameProps) {
  const [snake, setSnake] = useState<Position[]>([]);
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [food, setFood] = useState<Food | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  const generateFood = useCallback(() => {
    const position: Position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    let value: number;
    switch (mode) {
      case GameMode.POSITIVE:
        value = Math.floor(Math.random() * 20) + 1;
        break;
      case GameMode.NEGATIVE:
        value = -(Math.floor(Math.random() * 20) + 1);
        break;
      default:
        value = Math.floor(Math.random() * 40) - 20;
    }

    return { position, value, createdAt: Date.now() };
  }, [mode]);

  const isValidFood = useCallback((value: number): boolean => {
    switch (mode) {
      case GameMode.EVEN:
        return value % 2 === 0;
      case GameMode.ODD:
        return value % 2 !== 0;
      case GameMode.POSITIVE:
        return value > 0;
      case GameMode.NEGATIVE:
        return value < 0;
      case GameMode.MULTIPLE:
        return multiplier ? value % multiplier === 0 : false;
      default:
        return false;
    }
  }, [mode, multiplier]);

  const initializeGame = useCallback(() => {
    const initialSnake: Position[] = [];
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      initialSnake.push({ x: Math.floor(GRID_SIZE / 2) - i, y: Math.floor(GRID_SIZE / 2) });
    }
    setSnake(initialSnake);
    setFood(generateFood());
    setDirection('RIGHT');
    setScore(0);
    setLives(3);
    setGameOver(false);
  }, [generateFood]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Check food expiration
  useEffect(() => {
    if (!food || gameOver) return;

    const checkFoodExpiration = () => {
      const now = Date.now();
      if (now - food.createdAt >= FOOD_DURATION) {
        setFood(generateFood());
      }
    };

    const expirationInterval = setInterval(checkFoodExpiration, 100);
    return () => clearInterval(expirationInterval);
  }, [food, gameOver, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        switch (direction) {
          case 'UP':
            head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case 'DOWN':
            head.y = (head.y + 1) % GRID_SIZE;
            break;
          case 'LEFT':
            head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case 'RIGHT':
            head.x = (head.x + 1) % GRID_SIZE;
            break;
        }

        // Check if snake hits itself
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(head);

        // Check if snake eats food
        if (food && head.x === food.position.x && head.y === food.position.y) {
          if (isValidFood(food.value)) {
            setScore(prev => prev + Math.abs(food.value));
          } else {
            setLives(prev => {
              const newLives = prev - 1;
              if (newLives <= 0) {
                setGameOver(true);
                return 0;
              }
              return newLives;
            });
          }
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [direction, food, gameOver, generateFood, isValidFood]);

  useEffect(() => {
    if (gameOver) {
      const timer = setTimeout(() => {
        onGameOver();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [gameOver, onGameOver]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="mb-4 text-xl">
        <span className="mr-6">Puntuación: {score}</span>
        <span>Vidas: {'❤️'.repeat(Math.max(0, lives))}</span>
      </div>

      <div
        className="relative bg-gray-800 rounded-lg"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE
        }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute bg-green-500 rounded"
            style={{
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
            }}
          />
        ))}

        {food && (
          <div
            className={`absolute flex items-center justify-center text-sm font-bold
              ${isValidFood(food.value) ? 'bg-yellow-400' : 'bg-red-500'}`}
            style={{
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              left: food.position.x * CELL_SIZE,
              top: food.position.y * CELL_SIZE,
              borderRadius: '50%',
              transition: 'opacity 0.3s',
              opacity: Math.max(0, 1 - (Date.now() - food.createdAt) / FOOD_DURATION),
            }}
          >
            {food.value}
          </div>
        )}
      </div>

      {gameOver && (
        <div className="mt-4 text-2xl text-red-500 font-bold">
          ¡Juego Terminado! Puntuación Final: {score}
        </div>
      )}
    </div>
  );
}

export default Game;