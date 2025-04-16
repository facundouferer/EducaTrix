export interface Player {
  id: string;
  name: string;
  color: string;
  position: number;
}

export interface Fraction {
  numerator: number;
  denominator: number;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  fraction1: Fraction;
  fraction2: Fraction;
  gameStarted: boolean;
  winner: Player | null;
  totalRounds: number;
}