import React, { useState } from 'react';
import { GameMode } from '../types';

interface GameSetupProps {
  onStartGame: (mode: GameMode, multiplier?: number) => void;
}

function GameSetup({ onStartGame }: GameSetupProps) {
  const [selectedMode, setSelectedMode] = useState<GameMode>(GameMode.EVEN);
  const [multiplier, setMultiplier] = useState<number>(2);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Serpiente Numérica</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-lg mb-2">Selecciona el Modo de Juego:</label>
            <select
              className="w-full bg-gray-700 text-white p-2 rounded"
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value as GameMode)}
            >
              <option value={GameMode.EVEN}>Números pares</option>
              <option value={GameMode.ODD}>Números impares</option>
              <option value={GameMode.POSITIVE}>Números positivos</option>
              <option value={GameMode.NEGATIVE}>Números Negativos</option>
              <option value={GameMode.MULTIPLE}>Múltiplos</option>
            </select>
          </div>

          {selectedMode === GameMode.MULTIPLE && (
            <div>
              <label className="block text-lg mb-2">Selecciona el Multiplicador (1-9):</label>
              <input
                type="number"
                min="1"
                max="9"
                value={multiplier}
                onChange={(e) => setMultiplier(Number(e.target.value))}
                className="w-full bg-gray-700 text-white p-2 rounded"
              />
            </div>
          )}

          <button
            onClick={() => onStartGame(selectedMode, selectedMode === GameMode.MULTIPLE ? multiplier : undefined)}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition duration-200"
          >
            Iniciar Juego
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameSetup;