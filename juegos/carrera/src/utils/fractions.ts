export const generateFraction = () => {
  const numerator = Math.floor(Math.random() * 10) + 1;
  const denominator = Math.floor(Math.random() * 10) + 1;
  return { numerator, denominator };
};

export const generateDifferentFractions = () => {
  const fraction1 = generateFraction();
  let fraction2;
  
  do {
    fraction2 = generateFraction();
  } while (fraction1.numerator / fraction1.denominator === fraction2.numerator / fraction2.denominator);
  
  return [fraction1, fraction2];
};