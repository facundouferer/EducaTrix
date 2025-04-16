import React from 'react';
import { motion } from 'framer-motion';
import { Car } from 'lucide-react';
import type { Player } from '../types/game';

interface RaceTrackProps {
  players: Player[];
  totalRounds: number;
}

export const RaceTrack: React.FC<RaceTrackProps> = ({ players, totalRounds }) => {
  return (
    <div className="w-full bg-gray-100 p-6 rounded-xl">
      {players.map((player) => (
        <div key={player.id} className="relative h-16 mb-4">
          <div className="absolute inset-0 flex">
            {Array.from({ length: totalRounds }).map((_, i) => (
              <div
                key={i}
                className="flex-1 border-r border-gray-300 last:border-r-0"
                style={{
                  backgroundColor: i <= player.position ? 'rgba(203, 213, 224, 0.5)' : 'transparent'
                }}
              />
            ))}
          </div>
          
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: `${(player.position / (totalRounds - 1)) * 100}%` }}
            transition={{ type: "spring", stiffness: 60 }}
            className="absolute top-0 left-0 h-full flex items-center"
            style={{ zIndex: 10 }}
          >
            <Car size={32} color={player.color} />
          </motion.div>
          
          <div className="absolute right-2 top-1/2 -translate-y-1/2 font-semibold text-gray-700">
            {player.name} ({player.position}/{totalRounds})
          </div>
        </div>
      ))}
    </div>
  );
};