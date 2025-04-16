import React from 'react';
import type { Card } from '../types';

interface DropZoneProps {
  onDrop: (card: Card) => void;
  card: Card | null;
}

export const DropZone: React.FC<DropZoneProps> = ({ onDrop, card }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const cardData = e.dataTransfer.getData('card');
    onDrop(JSON.parse(cardData));
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`
        w-16 h-16
        rounded-lg
        flex items-center justify-center
        text-2xl font-bold
        ${card ? getCardColor(card) : 'bg-gray-200'}
        ${!card && 'border-2 border-dashed border-gray-400'}
        transition-all duration-200
      `}
    >
      {card?.value}
    </div>
  );
};

const getCardColor = (card: Card) => {
  if (card.type === 'number') return 'bg-blue-500 text-white';
  if (card.type === 'operator') return 'bg-green-500 text-white';
  return 'bg-yellow-500 text-white';
};