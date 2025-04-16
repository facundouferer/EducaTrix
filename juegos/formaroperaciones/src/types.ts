export interface Card {
  type: 'number' | 'operator' | 'equals';
  value: string;
}