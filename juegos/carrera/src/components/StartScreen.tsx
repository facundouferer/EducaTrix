import React, { useState } from 'react';
import { Car } from 'lucide-react';
import type { Player } from '../types/game';

interface StartScreenProps {
  onGameStart: (players: Player[], rounds: number) => void;
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
const MIN_ROUNDS = 5;
const MAX_ROUNDS = 20;

export const StartScreen: React.FC<StartScreenProps> = ({ onGameStart }) => {
  const [numPlayers, setNumPlayers] = useState(2);
  const [rounds, setRounds] = useState(10);
  const [players, setPlayers] = useState<Partial<Player>[]>([
    { name: '', color: COLORS[0] },
    { name: '', color: COLORS[1] },
  ]);

  const handleNumPlayersChange = (num: number) => {
    setNumPlayers(num);
    setPlayers(prev => {
      if (num > prev.length) {
        return [...prev, ...Array(num - prev.length).fill({}).map((_, i) => ({
          name: '',
          color: COLORS[prev.length + i]
        }))];
      }
      return prev.slice(0, num);
    });
  };

  const handleStartGame = () => {
    if (players.every(p => p.name && p.name.trim() !== '')) {
      onGameStart(
        players.map((p, i) => ({
          id: `player-${i}`,
          name: p.name!,
          color: p.color!,
          position: 0
        })),
        rounds
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Carrera de Fracciones
        </h1>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Número de casilleros (rondas):</label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={MIN_ROUNDS}
              max={MAX_ROUNDS}
              value={rounds}
              onChange={(e) => setRounds(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-lg font-semibold w-12 text-center">{rounds}</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Número de jugadores:</label>
          <div className="flex gap-2">
            {[2, 3, 4].map(num => (
              <button
                key={num}
                onClick={() => handleNumPlayersChange(num)}
                className={`flex-1 py-2 rounded ${
                  numPlayers === num
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {players.map((player, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center gap-4">
              <Car size={24} color={player.color} />
              <input
                type="text"
                placeholder={`Nombre Jugador ${index + 1}`}
                value={player.name}
                onChange={(e) => {
                  const newPlayers = [...players];
                  newPlayers[index] = { ...player, name: e.target.value };
                  setPlayers(newPlayers);
                }}
                className="w-full px-4 py-2 rounded border focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        ))}

        <button
          onClick={handleStartGame}
          disabled={!players.every(p => p.name && p.name.trim() !== '')}
          className="w-full mt-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 
                   disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          ¡Comenzar Carrera!
        </button>
      </div>
    </div>
  );
};