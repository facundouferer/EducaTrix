import React from 'react';
import type { Card } from '../types';

interface DragCardProps {
  card: Card;
}

export const DragCard: React.FC<DragCardProps> = ({ card }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('card', JSON.stringify(card));
  };

  const getCardColor = () => {
    if (card.type === 'number') return 'bg-blue-500 hover:bg-blue-600';
    if (card.type === 'operator') return 'bg-green-500 hover:bg-green-600';
    return 'bg-yellow-500 hover:bg-yellow-600';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`
        ${getCardColor()}
        w-16 h-16
        rounded-lg
        flex items-center justify-center
        text-white text-2xl font-bold
        cursor-move
        transform hover:scale-105 transition-all
        shadow-lg
      `}
    >
      {card.value}
    </div>
  );
};