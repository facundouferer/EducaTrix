import type { Card } from '../types';

export const generateLevel = (level: number) => {
  const operators = ['+', '-', '×', '÷'];
  let cards: Card[] = [];
  let solution: number;

  if (level <= 3) {
    // Simple operations (e.g., 5 + 5 = 10)
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = operators[Math.floor(Math.random() * 2)]; // Only + and -
    solution = operator === '+' ? num1 + num2 : num1 - num2;

    cards = [
      { type: 'number', value: num1.toString() },
      { type: 'operator', value: operator },
      { type: 'number', value: num2.toString() },
      { type: 'equals', value: '=' },
      { type: 'number', value: solution.toString() },
    ];

    // Add distractors
    cards.push(
      { type: 'number', value: (solution + 1).toString() },
      { type: 'number', value: (solution - 1).toString() },
      { type: 'operator', value: operators[2] }, // × for distraction
    );
  } else {
    // More complex operations (e.g., 4 × 5 + 2 = 22)
    const num1 = Math.floor(Math.random() * 12) + 1;
    const num2 = Math.floor(Math.random() * 12) + 1;
    const num3 = Math.floor(Math.random() * 12) + 1;
    const operator1 = operators[Math.floor(Math.random() * operators.length)];
    const operator2 = operators[Math.floor(Math.random() * operators.length)];

    // Calculate solution based on operators
    let intermediateResult;
    switch (operator1) {
      case '+': intermediateResult = num1 + num2; break;
      case '-': intermediateResult = num1 - num2; break;
      case '×': intermediateResult = num1 * num2; break;
      case '÷': intermediateResult = num1 / num2; break;
      default: intermediateResult = 0;
    }

    switch (operator2) {
      case '+': solution = intermediateResult + num3; break;
      case '-': solution = intermediateResult - num3; break;
      case '×': solution = intermediateResult * num3; break;
      case '÷': solution = intermediateResult / num3; break;
      default: solution = 0;
    }

    cards = [
      { type: 'number', value: num1.toString() },
      { type: 'operator', value: operator1 },
      { type: 'number', value: num2.toString() },
      { type: 'operator', value: operator2 },
      { type: 'number', value: num3.toString() },
      { type: 'equals', value: '=' },
      { type: 'number', value: Math.round(solution).toString() },
    ];

    // Add more distractors for higher levels
    cards.push(
      { type: 'number', value: (Math.round(solution) + 2).toString() },
      { type: 'number', value: (Math.round(solution) - 2).toString() },
      { type: 'operator', value: operators[Math.floor(Math.random() * operators.length)] },
    );
  }

  // Shuffle cards
  return {
    cards: cards.sort(() => Math.random() - 0.5),
    solution: Math.round(solution),
  };
};